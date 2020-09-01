<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class BaseController extends AbstractController
{

    /**
     * @return User|null
     */
    protected function getUser()
    {
        return parent::getUser();
    }
}
