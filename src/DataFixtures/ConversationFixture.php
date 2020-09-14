<?php

namespace App\DataFixtures;

use App\Entity\Conversation;
use Doctrine\Persistence\ObjectManager;

class ConversationFixture extends BaseFixture
{
    protected function loadData(ObjectManager $manager)
    {
        echo "ConversationFixture" . PHP_EOL;
        $this->createMany(Conversation::class, 9, function (Conversation $conversation, $i) {
            $conversation
                ->setIsCouple(true)
                ->setIsSingle(false)
                ->setIsMultiple(false)
                ->setIsPublic(false)
            ;
        });

        $conversation = new Conversation();
        $conversation
            ->setIsPublic(true)
            ->setIsMultiple(true)
            ->setIsSingle(false)
            ->setIsCouple(false)
            ->setName("Ogólny");
        $manager->persist($conversation);

        $manager->flush();
    }
}
