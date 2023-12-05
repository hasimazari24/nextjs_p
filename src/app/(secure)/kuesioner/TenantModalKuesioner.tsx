import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Heading,
  Stack,
} from "@chakra-ui/react";
import FormKuesioner from "./kelola/[id_kuesioner]/components/FormKuesioner";

const TenantModalKuesioner = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        bgColor={"blue.50"}
        _hover={{ bgColor: "blue.100" }}
      >
        Isi Kuesioner
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Full Screen Modal</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack
              spacing={3}
              alignItems={"center"}
              w="full"
              px={{ base: 0, md: "100px", lg: "150px", xl: "200px" }}
            >
              <Heading
                textAlign="center"
                fontSize={"2xl"}
                maxW={{ base: "full", md: "540px", lg: "720px" }}
                whiteSpace={"normal"}
              >
                JUDUL KUESIONER TAHUNAN Lorem ipsum dolor, sit amet consectetur
                adipisicing elit
              </Heading>
              <Text
                textAlign="justify"
                dangerouslySetInnerHTML={{
                  __html:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis delectus nam facere veritatis. Praesentium eveniet tempora voluptas, facilis saepe perspiciatis, laborum et amet iusto aliquid possimus velit quos modi neque corrupti perferendis in cumque? Illum optio odio amet, inventore quas aperiam, natus assumenda consequuntur accusamus beatae, alias quo dolor provident!",
                }}
              />
              <FormKuesioner
                data={[
                  {
                    id: "ID1",
                    heading: "Pilih Jenis Produk Anda",
                    type: "radio",
                    value: [
                      { id: "val1", title: "Teknologi" },
                      { id: "val2", title: "Makanan" },
                      { id: "val3", title: "Jasa Layanan" },
                      { id: "val4", title: "Telekomunikasi" },
                      { id: "val5", title: "Seni dan Kriya" },
                    ],
                  },
                  {
                    id: "ID2",
                    heading: "Apa Saja Produknya ?",
                    type: "checkbox",
                    value: [
                      { id: "val1", title: "Teknologi" },
                      { id: "val2", title: "Makanan" },
                      { id: "val3", title: "Jasa Layanan" },
                      { id: "val4", title: "Telekomunikasi" },
                      { id: "val5", title: "Seni dan Kriya" },
                    ],
                  },
                  {
                    id: "ID3",
                    heading: "Jelaskan Bisnis anda ?",
                    type: "short_text",
                  },
                ]}
              />
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            {/* Tambahan tombol atau elemen footer lainnya */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TenantModalKuesioner;
