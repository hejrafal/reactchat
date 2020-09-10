<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mercure\PublisherInterface;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
    /**
     * @Route("/users", name="user_list")
     */
    public function list(UserRepository $userRepository)
    {
        $users = $userRepository->findAll();
        return $this->json($users, 200, [], [
            'groups' => ['user:base']
        ]);
    }

    /**
     * @Route("/new-user", name="new_user", methods={"POST"})
     */
    public function newUser(Request $request, PublisherInterface $publisher)
    {
        $postData = json_decode($request->getContent());

        $topic = 'all'; //http://example.com/books/1
        $update = new Update('http://localhost:3000/.well-known/mercure?topic='.$topic, $request->getContent());
        $publisher($update);

        return $this->json(['username' => $postData->username]);
    }
}
