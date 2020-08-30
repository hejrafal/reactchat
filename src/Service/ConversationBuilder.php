<?php

namespace App\Service;

use App\Entity\Conversation;
use App\Entity\Participant;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

class ConversationBuilder
{

    /**
     * @var EntityManagerInterface
     */
    private $em;

    public function __construct(EntityManagerInterface $em)
    {

        $this->em = $em;
    }

    public function createBetween(User $user, User $withUser) : Conversation
    {
        $conversation = new Conversation();
        $conversation->setIsCouple(true);

        $p1 = new Participant();
        $p1->setConversation($conversation)
            ->setUser($user);

        $p2 = new Participant();
        $p2->setConversation($conversation)
            ->setUser($withUser);

        $this->em->persist($conversation);
        $this->em->persist($p1);
        $this->em->persist($p2);

        return $conversation;
    }

}
