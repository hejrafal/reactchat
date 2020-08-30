<?php

namespace App\DataFixtures;

use App\Entity\Conversation;
use App\Entity\Participant;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class ParticipantFixture extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $user1 = $this->getReference(User::class . '_0');

        echo "ParticipantFixture" . PHP_EOL;
        for ($i = 0; $i < 9; $i++) {
            $c = $this->getReference(Conversation::class . '_' . $i);
            $p1 = new Participant();
            $p1->setConversation($c)
                ->setUser($user1);
            $this->addReference('MainParticipant_' . $i, $p1);

            $user2 = $this->getReference(User::class . '_' . ($i + 1));
            $p2 = new Participant();
            $p2->setConversation($c)
                ->setUser($user2);
            $this->addReference('SecondParticipant_' . $i, $p2);

            $manager->persist($p1);
            $manager->persist($p2);
        }

        $manager->flush();
    }


    public function getDependencies()
    {
        return array(
            UserFixture::class,
            ConversationFixture::class,
        );
    }
}
