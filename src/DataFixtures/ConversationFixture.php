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
                ->setIsMain(false)
            ;
        });

        $manager->flush();
    }
}
