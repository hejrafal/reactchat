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
        $conversation = $this->createConversation(true, false);
        $p1 = $this->addNewParticipantToConversation($conversation, $user);
        $p2 = $this->addNewParticipantToConversation($conversation, $withUser);

        $this->em->persist($conversation);
        $this->em->persist($p1);
        $this->em->persist($p2);

        return $conversation;
    }

    public function createRoom(string $name, User $user) : Conversation
    {
        $conversation = $this->createConversation(false, false, $name);
        $p = $this->addNewParticipantToConversation($conversation, $user);

        $this->em->persist($conversation);
        $this->em->persist($p);

        return $conversation;
    }

    public function createSingle(User $user) : Conversation
    {
        $conversation = $this->createConversation(false, true);
        $p = $this->addNewParticipantToConversation($conversation, $user);

        $this->em->persist($conversation);
        $this->em->persist($p);

        return $conversation;
    }

    private function createConversation(bool $isCouple, bool $isSingle, string $name = null, bool $isMain = false) : Conversation
    {
        return (new Conversation())
            ->setIsCouple($isCouple)
            ->setIsSingle($isSingle)
            ->setIsMain($isMain)
            ->setName($name);
    }

    private function addNewParticipantToConversation(Conversation $conversation, User $user) : Participant
    {
        $p = (new Participant())->setUser($user);
        $conversation->addParticipant($p);

        return $p;
    }

}
