<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mercure\PublisherInterface;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Routing\Annotation\Route;

class MainController extends AbstractController
{
    /**
     * @Route("/", name="homepage")
     */
    public function index()
    {
        return $this->render('main/index.html.twig');
    }

    /**
     * @Route("/new-user", name="new_user", methods={"POST"})
     */
    public function newUser(Request $request, PublisherInterface $publisher)
    {
        $postData = json_decode($request->getContent());

        $update = new Update('http://localhost:3000/.well-known/mercure?topic=http://example.com/books/1', $request->getContent());
        $publisher($update);

        return $this->json(['username' => $postData->username]);
    }

    /**
     * @Route("/new-message", name="new_message", methods={"POST"})
     */
    public function newMessage(Request $request, PublisherInterface $publisher)
    {
        $postData = json_decode($request->getContent());

        $update = new Update('http://example.com/books/1', $request->getContent());
        $publisher($update);

        return $this->json([]);
    }
}
