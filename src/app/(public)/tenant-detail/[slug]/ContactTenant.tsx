import * as React from "react";
import { VStack, Stack, HStack, Text, Icon, Tag, useBreakpointValue, Flex, Box } from "@chakra-ui/react";
import { ReactElement } from "react";
import { MdMailOutline, MdOutlineMap, MdOutlineContacts } from "react-icons/md";
import { IconType } from "react-icons";
import {tenant_program} from "@/app/type/tenant-type.d";

interface ContactInfoProps {
  icon: IconType;
  title: string;
  content: string;
  label: string;
  size?: number;
  tags?: tenant_program[];
}

const ContactInfo = ({ icon, title, label, tags, content, size = 24}: ContactInfoProps) => {
  // const isMobile = useBreakpointValue({ base: true, md: false }); 
  // const iconSize = isMobile ? 28 : 24; 

  // const iconContainerStyle = {
  //   width: `${iconSize}px`, 
  // };

  return (
    <HStack spacing={["4", "6"]} align={"top"}>
      <Box>
        <Icon as={icon} fontSize={size} pt="1px" />
      </Box>
      <VStack align="start" spacing="4px">
        <Text fontSize={["lg", "xl"]} fontWeight="bold">
          {title}
        </Text>
        <Text fontSize="md" fontWeight="regular">
          {content}
        </Text>
        {tags && tags.length > 0 && (
          <Stack spacing="1" direction={"row"} flexWrap={"wrap"}>
            {tags.map((tag, index) => (
              <Tag
                key={index}
                color="red.500"
                colorScheme="red"
                variant="outline"
                size="sm"
                title={tag.program}
              >
                <Text
                  textOverflow="ellipsis"
                  whiteSpace={"nowrap"}
                  cursor={"pointer"}
                  overflow="hidden"
                  maxW={{ base: "120px", md: "200px", lg: "250px" }}
                >
                  {tag.program}
                </Text>
              </Tag>
            ))}
          </Stack>
        )}
      </VStack>
    </HStack>
  );
};

export default ContactInfo;
