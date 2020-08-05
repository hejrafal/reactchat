<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
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
    public function newUser(Request $request)
    {
        $postData = json_decode($request->getContent());

        return $this->json(['username' => $postData->username]);
    }
}
