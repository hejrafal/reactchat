<?php

namespace App\Controller;

use App\Entity\Conversation;
use App\Service\ConversationBuilder;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mercure\PublisherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class RoomController extends BaseController
{


    /**
     * @Route("/room/create", name="new_room", methods={"POST"})
     */
    public function create(Request $request, ConversationBuilder $conversationBuilder, PublisherInterface $publisher, EntityManagerInterface $em, SerializerInterface $serializer)
    {
        $data = json_decode($request->getContent());
        $conversation = $conversationBuilder->createRoom($data->name, $this->getUser());
        $em->flush();

        return $this->json($conversation, 200, [], [
            'attributes' => ['id', 'name']
        ]);
    }
}
