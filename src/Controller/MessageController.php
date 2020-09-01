<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\ConversationRepository;
use App\Repository\MessageRepository;
use App\Service\ConversationBuilder;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Routing\Annotation\Route;

class MessageController extends BaseController
{

    /**
     * @Route("/messages/user/{id}", name="list_user_messages", methods={"GET"})
     * @param User $user
     */
    public function listUserMessages(User $user, ConversationRepository $conversationRepository, EntityManagerInterface $em, ConversationBuilder $conversationBuilder, MessageRepository $messageRepository)
    {
        $conv = $conversationRepository->findConversationBetween($this->getUser(), $user);
        if(!$conv) {
            $conv = $conversationBuilder->createBetween($this->getUser(), $user);
            $em->flush();
        }

        $messages = $messageRepository->findByConversation($conv);
        return $this->json($messages, 200, [], [
            'groups' => ['messages'],
            'datetime_format' => 'Y-m-d H:i:s'
        ]);
    }

}
