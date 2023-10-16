import * as React from "react";
import { VStack, HStack, Text, Icon, Tag, useBreakpointValue, Flex } from "@chakra-ui/react";
import { ReactElement } from "react";
import { MdMailOutline, MdOutlineMap, MdOutlineContacts } from "react-icons/md";


interface ContactInfoProps {
  icon: ReactElement;
  title: string;
  content: string;
  label: string;
  size?: number;
  tags?: string[];
}

const ContactInfo = ({ icon, title, label, tags, content, size = 24}: ContactInfoProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false }); 
  const iconSize = isMobile ? 28 : 24; 

  const iconContainerStyle = {
    width: `${iconSize}px`, 
  };

  return (
    <VStack align={'left'}>
      <HStack spacing={6}>
      {React.cloneElement(icon, { fontSize: size })} 
        <VStack align={"left"}>
          <Text fontSize="xl" fontWeight="bold" textAlign={'left'}>
            {title}
          </Text>
          <Text fontSize="md" fontWeight="regular" textAlign={'left'}>
            {content}
          </Text>
          {tags && tags.length > 0 && (
            <Flex>
              {tags.map((tag, index) => (
                <Tag 
                  key={index}
                  color={"red.500"}
                  colorScheme={"red"}
                  variant="outline"
                  size={"sm"}
                  style={{ whiteSpace: 'normal', overflow: 'hidden', textOverflow: 'ellipsis', wordWrap: 'break-word' }}
                    >
                  {tag}
                </Tag>
              ))}
            </Flex>
          )}
        </VStack>
      </HStack>
    </VStack>
  );
};

export default ContactInfo;
