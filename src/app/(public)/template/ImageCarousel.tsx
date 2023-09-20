// components/ImageGallery.tsx
import { Box, Flex, Image, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";

interface Image {
  id: string;
  src: string;
  alt: string;
}

interface ImageGalleryProps {
  images: Image[];
}

const ImageCarousel: React.FC<ImageGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleImageClick = (image: Image) => {
    setSelectedImage(image);
  };

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      maxWidth="800px"
      margin="0 auto"
    >
      {/* Carousel Gambar Besar */}
      <Box marginBottom="20px">
        <Image src={selectedImage.src} alt={selectedImage.alt} width="100%" />
      </Box>

      {/* Carousel Kartu Gambar Kecil */}
      <SimpleGrid columns={4} spacing={4}>
        {images.map((image) => (
          <Box
            key={image.id}
            onClick={() => handleImageClick(image)}
            cursor="pointer"
          >
            <Image src={image.src} alt={image.alt} width="100%" />
          </Box>
        ))}
      </SimpleGrid>
    </Flex>
  );
};

export default ImageCarousel;
