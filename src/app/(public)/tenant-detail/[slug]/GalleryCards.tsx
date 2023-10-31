    import * as React from "react";
    import { Box, Text, Stack, Container, Image, Drawer, DrawerOverlay, DrawerBody, DrawerHeader, DrawerContent, DrawerCloseButton } from "@chakra-ui/react";
    import {useState} from "react";
import { title } from "process";

    interface GalleryCardProps {
        image: string;
        judul: string;
        deskripsi: string;
       
    }

    const CardGallery = ({image, judul, deskripsi}: GalleryCardProps) => {

        const [isDrawerOpen, setIsDrawerOpen] = useState(false);

         const openDrawer = () => {
            setIsDrawerOpen(true);
        };

        const closeDrawer = () => {
            setIsDrawerOpen(false);
        };

        return (
            <Box w="full">
                <Stack
                bgColor="white"
                maxW={'xl'}
                boxShadow="2xl"
                spacing="2"
                rounded="xl"
                align="center"
                p="4"
                // justifyContent={'flex-start'}
                >
                    <Image
                        // boxSize={[20,40]}
                        height="auto"
                        w={"xl"}
                        src={image}
                        rounded="md"
                        boxShadow="xl"
                        onClick={openDrawer}
                       
                    />
                    <Text
                        textAlign="center"
                        fontSize={["sm","md"]}
                        textShadow="xl"
                        color="black"
                        fontStyle="bold"
                        onClick={openDrawer}
                    >
                        {judul}
                    </Text>
                    
                </Stack>
                 <Drawer
                    isOpen={isDrawerOpen}
                    onClose={closeDrawer}
                    placement="right"
                    size={["sm","md"]}
                >
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>
                            <Text
                            fontSize={["20","24"]}
                            color="gray.800"
                            fontWeight={'bold'}
                            px={4}
                            textAlign={'center'}>
                                {judul}
                            </Text>
                        </DrawerHeader>
                        <DrawerBody>
                            <Stack
                            spacing={6}
                            px={4}
                            >
                                <Image
                                src={image}
                                rounded={'xl'} />
                                <Text
                                color={'gray.700'}
                                textAlign={'justify'}
                                >
                                    {deskripsi}
                                </Text>
                            </Stack>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </Box>
        );
    };

    export default CardGallery;