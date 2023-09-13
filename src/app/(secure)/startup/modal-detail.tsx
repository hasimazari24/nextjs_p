import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

interface dataDetail {
  name: string;
  description: string;
  address: string;
  contact: string;
  email: string;
  founder: string;
  level_tenant:string;
};

interface ModalWithTableProps {
  isOpen: boolean;
  onClose: () => void;
  tableData: any; // Data untuk tabel
}

const ModalDetail: React.FC<ModalWithTableProps> = ({
  isOpen,
  onClose,
  tableData,
}) => {
  // console.log(tableData);
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Data Detail</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Table pt="0">
            <Tbody>
              <Tr key={1}>
                <Td width="20%" pr="0" pl="0" pt="0">
                  Nama
                </Td>
                <Td width="5%" textAlign="center" pr="0" pl="0" pt="0">
                  :
                </Td>
                <Td width="75%" pr="0" pl="0" pt="0">
                  {tableData?.name}
                </Td>
                {/* Tambahkan kolom lainnya sesuai kebutuhan */}
              </Tr>

              <Tr key={2} pb="3">
                <Td width="20%" pr="0" pl="0">
                  Deskripsi
                </Td>
                <Td width="5%" pr="0" pl="0" textAlign="center">
                  :
                </Td>
                <Td width="75%" pr="0" pl="0">
                  {tableData?.description}
                </Td>
              </Tr>
              <Tr key={2} pb="3">
                <Td width="20%" pr="0" pl="0">
                  Alamat
                </Td>
                <Td width="5%" pr="0" pl="0" textAlign="center">
                  :
                </Td>
                <Td width="75%" pr="0" pl="0">
                  {tableData?.address}
                </Td>
              </Tr>
              <Tr key={2} pb="3">
                <Td width="20%" pr="0" pl="0">
                  Kontak
                </Td>
                <Td width="5%" pr="0" pl="0" textAlign="center">
                  :
                </Td>
                <Td width="75%" pr="0" pl="0">
                  {tableData?.contact}
                </Td>
              </Tr>
              <Tr key={2} pb="3">
                <Td width="20%" pr="0" pl="0">
                  E-Mail
                </Td>
                <Td width="5%" pr="0" pl="0" textAlign="center">
                  :
                </Td>
                <Td width="75%" pr="0" pl="0">
                  {tableData?.email}
                </Td>
              </Tr>
              <Tr key={2} pb="3">
                <Td width="20%" pr="0" pl="0">
                  Founder
                </Td>
                <Td width="5%" pr="0" pl="0" textAlign="center">
                  :
                </Td>
                <Td width="75%" pr="0" pl="0">
                  {tableData?.founder}
                </Td>
              </Tr>
              <Tr key={2} pb="3">
                <Td width="20%" pr="0" pl="0">
                  Level Tenant
                </Td>
                <Td width="5%" pr="0" pl="0" textAlign="center">
                  :
                </Td>
                <Td width="75%" pr="0" pl="0">
                  {tableData?.level_tenant}
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          {/* Tombol atau elemen lain di bagian bawah modal */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalDetail;
