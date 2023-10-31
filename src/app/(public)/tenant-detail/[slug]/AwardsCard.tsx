import * as React from "react";
import { useState } from "react";
import { Box, Text, Stack, Image, Accordion, AccordionItem, AccordionButton, AccordionPanel } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

interface AwardsCardProps {
  logo: string;
  title: string;
  juara: string;
}

const noBorderStyle = {
  border: "none"
};

const CardAwards = ({ logo, title, juara }: AwardsCardProps) => {
  const maxTitleLength = 25;
  const isTitleTooLong = title.length > maxTitleLength;
  const [isAccordionOpen, setAccordionOpen] = useState(false);

  const truncatedTitle = isTitleTooLong ? title.slice(0, maxTitleLength) + "..." : title;

  return (
    <Box>
      <Stack
        maxW={["lg", "2xl"]}
        bgColor="white"
        boxShadow="2xl"
        // w={["140px", "200px"]}
        spacing={2}
        rounded={'xl'}
        align={'center'}
        p={4}
      >
        <Image
            boxSize={[16, 24]}
            src={logo}
            rounded={"md"}
            boxShadow={'xl'}
        />
        <Text
            textAlign="center"
            fontSize={["lg","xl"]}
            color="gray.800"
            fontStyle="bold"
        >
          {juara}
        </Text>
        <Accordion allowToggle={true}>
          <AccordionItem>
            <h2>
              <Box as="span"
                textAlign="center"
                fontStyle="bold"
                color="gray.800"
                fontSize={["xs", "sm"]}
                display={isAccordionOpen ? "none" : "block"} // Hide title when accordion is open
              >
                {truncatedTitle}
              </Box>
              <AccordionButton onClick={() => setAccordionOpen(!isAccordionOpen)}
                justifyContent={'center'}
                style={noBorderStyle}
              >
                {isAccordionOpen ? (
                  <ChevronUpIcon />
                ) : (
                  <ChevronDownIcon />
                )}
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <Text
                textAlign="center"
                fontStyle="bold"
                color="gray.800"
                fontSize={["xs", "sm"]}
              >
                {title}
              </Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Stack>
    </Box>
  );
};

export default CardAwards;
