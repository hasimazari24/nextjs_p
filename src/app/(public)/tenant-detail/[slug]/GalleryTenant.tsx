import * as React from "react";
import { Box, Text,Stack, Grid } from "@chakra-ui/react";
import CardGallery from "./GalleryCards";

const DataGallery = [
     {
        imgUrl :'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        title: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus, maxime',
         description :'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut at tempora et quia explicabo voluptatum corrupti cum, perferendis laboriosam voluptate.',
    },
    {
        imgUrl :'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        title: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus, maxime',
         description :'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut at tempora et quia explicabo voluptatum corrupti cum, perferendis laboriosam voluptate.',
    },
    {
        imgUrl :'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        title: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus, maxime',
         description :'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut at tempora et quia explicabo voluptatum corrupti cum, perferendis laboriosam voluptate.',
    },
    {
        imgUrl :'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        title: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus, maxime',
         description :'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut at tempora et quia explicabo voluptatum corrupti cum, perferendis laboriosam voluptate.',
    },
    {
        imgUrl :'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        title: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus, maxime',
         description :'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut at tempora et quia explicabo voluptatum corrupti cum, perferendis laboriosam voluptate.',
    },
    {
        imgUrl :'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        title: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus, maxime',
         description :'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut at tempora et quia explicabo voluptatum corrupti cum, perferendis laboriosam voluptate.',
    },
    {
        imgUrl :'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        title: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus, maxime',
         description :'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut at tempora et quia explicabo voluptatum corrupti cum, perferendis laboriosam voluptate.',
    },
];


const GalleryTenant = () => {
  return (
    <Box w="full">
      <Stack spacing="8" py={{ base: "4", md: "6" }}>
        <Text
          fontWeight="bold"
          color="gray.900"
          fontSize={["xl", "2xl", "3xl"]}
        >
          Galeri
        </Text>
        <Grid
          templateColumns={["1fr 1fr", "1fr 1fr 1fr", "1fr 1fr 1fr 1fr"]}
          flexWrap={"wrap"}
          gap={8}
        >
          {DataGallery.map((gallery, index) => (
            <CardGallery
              key={index}
              image={gallery.imgUrl}
              judul={gallery.title}
              deskripsi={gallery.description}
            />
          ))}
        </Grid>
      </Stack>
    </Box>
  );
};

export default GalleryTenant;