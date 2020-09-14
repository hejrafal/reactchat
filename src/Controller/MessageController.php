<?php

namespace App\Controller;

use App\Entity\Conversation;
use App\Entity\Message;
use App\Entity\Participant;
use App\Entity\User;
use App\Repository\ConversationRepository;
use App\Repository\MessageRepository;
use App\Repository\ParticipantRepository;
use App\Service\ConversationBuilder;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mercure\PublisherInterface;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class MessageController extends BaseController
{

    /**
     * @Route("/messages/user/{id}", name="list_user_messages", methods={"GET"})
     * @param User $user
     */
    public function listUserMessages(User $user, ConversationRepository $conversationRepository, EntityManagerInterface $em, ConversationBuilder $conversationBuilder, MessageRepository $messageRepository)
    {
        if ($this->getUser() === $user) {
            $conv = $conversationRepository->findSingleConversation($this->getUser());
            if (!$conv) {
                $conv = $conversationBuilder->createSingle($this->getUser());
                $em->flush();
            }
        } else {
            $conv = $conversationRepository->findConversationBetween($this->getUser(), $user);
            if (!$conv) {
                $conv = $conversationBuilder->createBetween($this->getUser(), $user);
                $em->flush();
            }
        }

        $messages = $messageRepository->findByConversation($conv);
        $result = [
            'messages' => $messages,
            'conversation' => $conv
        ];
        return $this->json($result, 200, [], [
            'groups' => ['messages', 'conversation'],
            'datetime_format' => 'Y-m-d H:i:s'
        ]);
    }


    /**
     * @Route("/new-message/{id}", name="new_message", methods={"POST"})
     */
    public function newMessage(Request $request, Conversation $conversation, PublisherInterface $publisher, ParticipantRepository $participantRepository, EntityManagerInterface $em, SerializerInterface $serializer, ConversationBuilder $conversationBuilder)
    {
        $postData = json_decode($request->getContent());

        $participant = $participantRepository->findOneByUserAndConversation($this->getUser(), $conversation);
        if (!$participant) {
            $participant = $conversationBuilder->addNewParticipantToConversation($conversation, $this->getUser());
            $em->persist($participant);
        }

        $message = new Message();
        $message->setParticipant($participant)
            ->setCreatedAt(new \DateTime())
            ->setContent($postData->message);
        $em->persist($message);
        $em->flush();

        foreach ($conversation->getParticipants() as $participant) {
            $participant->getUser()->getUsername();
            if($participant->getUser() === $this->getUser()) {
                continue;
            }

            //dump($participant->getUser(), $participant->getUser() === $this->getUser());

            $this->pushMessage($publisher, $serializer, $message, $participant->getUser());
        }


        return $this->json($message, 200, [], [
            'groups' => ['messages', 'conversation'],
            'datetime_format' => 'Y-m-d H:i:s'
        ]);
    }

    private function pushMessage(PublisherInterface $publisher, SerializerInterface $serializer, Message $message, User $user)
    {
        $topic = $user->getUsername(); //http://example.com/books/1
        $data = $serializer->serialize($message, 'json', [
            'groups' => ['messages', 'conversation'],
            'datetime_format' => 'Y-m-d H:i:s'
        ]);

        $update = new Update($topic, $data);
        $publisher($update);
    }


    /**
     * @Route("/messages/room/{id}", name="list_room_messages", methods={"GET"})
     * @param Conversation $conversation
     */
    public function listRoomMessages(Conversation $conversation, MessageRepository $messageRepository)
    {
        $messages = $messageRepository->findByConversation($conversation);
        $result = [
            'messages' => $messages,
            'conversation' => $conversation
        ];

        return $this->json($result, 200, [], [
            'groups' => ['messages', 'conversation'],
            'datetime_format' => 'Y-m-d H:i:s'
        ]);
    }
}
