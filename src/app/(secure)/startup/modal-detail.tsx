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

interface ModalWithTableProps {
  isOpen: boolean;
  onClose: () => void;
  tableData: any[]; // Data untuk tabel
}

const ModalDetail: React.FC<ModalWithTableProps> = ({
  isOpen,
  onClose,
  tableData,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Tabel dalam Modal</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Header 1</Th>
                <Th>Header 2</Th>
                {/* Tambahkan header lainnya sesuai kebutuhan */}
              </Tr>
            </Thead>
            <Tbody>
              {tableData.map((rowData, index) => (
                <Tr key={index}>
                  <Td>{rowData.column1}</Td>
                  <Td>{rowData.column2}</Td>
                  {/* Tambahkan kolom lainnya sesuai kebutuhan */}
                </Tr>
              ))}
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
