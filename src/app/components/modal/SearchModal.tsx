import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  Button,
  VStack,
  Text,
  ListItem,
  UnorderedList,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";

interface SearchModalProps {
  title: string;
  placeholder: string;
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
  searchResults: any[];
  onSelect: (selectedItem: any) => void;
}

const SearchModal = ({
  title,
  placeholder,
  isOpen,
  onClose,
  onSearch,
  searchResults,
  onSelect,
}: SearchModalProps) => {
  const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

  const handleSearch = () => {
    onSearch(query);
  };

  const handleSelect = (item: any) => {
    setSelectedItem(item);
    setIsConfirmationVisible(true);
  };

  const handleConfirm = () => {
    onSelect(selectedItem);
    onClose();
  };

  const handleCancel = () => {
    setSelectedItem(null);
    setIsConfirmationVisible(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack spacing={4} pb="3">
            <Input
              placeholder={placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button colorScheme="blue" onClick={handleSearch}>
              Cari
            </Button>
          </HStack>
          {searchResults.length > 0 && (
            <UnorderedList mt={4}>
              {searchResults.map((result) => (
                <ListItem
                  key={result.id}
                  cursor="pointer"
                  onClick={() => handleSelect(result)}
                >
                  {result.name}
                </ListItem>
              ))}
            </UnorderedList>
          )}
          {isConfirmationVisible && selectedItem && (
            <VStack mt={4} spacing={4}>
              <Text>Anda yakin ingin memilih item berikut?</Text>
              <Text fontWeight="bold">{selectedItem.name}</Text>
              <Button colorScheme="green" onClick={handleConfirm}>
                Ya
              </Button>
              <Button colorScheme="red" onClick={handleCancel}>
                Batal
              </Button>
            </VStack>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SearchModal;
