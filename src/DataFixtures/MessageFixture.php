<?php

namespace App\DataFixtures;

use App\Entity\Message;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class MessageFixture extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $faker = Factory::create();
        for ($i = 0; $i < 9; $i++) {
            for ($j = 0; $j < 50; $j++) {
                $p1 = $this->getReference('MainParticipant_' . $i);
                $p2 = $this->getReference('SecondParticipant_' . $i);
                $p = $faker->boolean ? $p1 : $p2;

                $message = new Message();
                $message->setContent($faker->text(rand(10, 50)))
                    ->setCreatedAt($faker->dateTimeBetween('-1 month', 'now'))
                    ->setParticipant($p);

                $manager->persist($message);
            }
        }

        $manager->flush();
    }

    public function getDependencies()
    {
        return array(
            ParticipantFixture::class
        );
    }
}
