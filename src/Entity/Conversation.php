<?php

namespace App\Entity;

use App\Repository\ConversationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=ConversationRepository::class)
 */
class Conversation
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"conversation"})
     */
    private $id;

    /**
     * @ORM\OneToMany(targetEntity=Participant::class, mappedBy="conversation")
     */
    private $participants;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"conversation"})
     */
    private $name;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"conversation"})
     */
    private $isCouple;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"conversation"})
     */
    private $isSingle;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"conversation"})
     */
    private $isMultiple;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"conversation"})
     */
    private $isPublic;

    public function __construct()
    {
        $this->participants = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection|Participant[]
     */
    public function getParticipants(): Collection
    {
        return $this->participants;
    }

    public function addParticipant(Participant $participant): self
    {
        if (!$this->participants->contains($participant)) {
            $this->participants[] = $participant;
            $participant->setConversation($this);
        }

        return $this;
    }

    public function removeParticipant(Participant $participant): self
    {
        if ($this->participants->contains($participant)) {
            $this->participants->removeElement($participant);
            // set the owning side to null (unless already changed)
            if ($participant->getConversation() === $this) {
                $participant->setConversation(null);
            }
        }

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getIsCouple(): ?bool
    {
        return $this->isCouple;
    }

    public function setIsCouple(bool $isCouple): self
    {
        $this->isCouple = $isCouple;

        return $this;
    }

    public function getIsSingle(): ?bool
    {
        return $this->isSingle;
    }

    public function setIsSingle(bool $isSingle): self
    {
        $this->isSingle = $isSingle;

        return $this;
    }

    public function getIsMultiple(): ?bool
    {
        return $this->isMultiple;
    }

    public function setIsMultiple(bool $isMultiple): self
    {
        $this->isMultiple = $isMultiple;

        return $this;
    }

    public function getIsPublic(): ?bool
    {
        return $this->isPublic;
    }

    public function setIsPublic(bool $isPublic): self
    {
        $this->isPublic = $isPublic;

        return $this;
    }
}
