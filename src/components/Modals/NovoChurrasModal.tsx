"use client";

import React from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import { NovoChurrasButton } from "@/components";
import { FormNovoChurras } from "@/components";
import { useRouter } from "next/navigation";

export function NovoChurrasModal() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSaveChurras = () => {
    router.replace("/dashboard");
    onClose();
  };

  return (
    <>
      <NovoChurrasButton onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cadastrar Novo Churras</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormNovoChurras onAddSuccess={handleSaveChurras} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
