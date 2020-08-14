<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserFixture extends BaseFixture
{
    /**
     * @var UserPasswordEncoderInterface
     */
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    protected function loadData(ObjectManager $manager)
    {
        $this->createMany(User::class, 10, function (User $user, $i) {
            $user
                ->setUsername(sprintf('user%d', $i))
                ->setPassword($this->encoder->encodePassword($user, 'qwe123'))
                ->setName($this->faker->firstName)
                ->setSurname($this->faker->name)
            ;
        });

        $manager->flush();
    }
}
