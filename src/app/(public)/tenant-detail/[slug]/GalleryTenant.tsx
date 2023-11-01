import * as React from "react";
import { Box, Text,Stack, Grid } from "@chakra-ui/react";
import CardGallery from "./GalleryCards";
import * as TenantTypes from "@/app/type/tenant-type.d";

const GalleryTenant = ({ tenant }: { tenant: TenantTypes.Tenant }) => {
   const gallery: TenantTypes.tenant_gallery[] = Array.isArray(
     tenant?.tenant_gallery,
   )
     ? tenant.tenant_gallery.map((d) => ({
         id: d.id,
         image_id: d.image_id,
         image_url: d.image_url,
         description: d.description,
         title: d.title,
         event_date_format: d.event_date_format,
         event_date: d.event_date,
       }))
     : [];

  return (
    <Box w="full">
      <Stack spacing="4">
        <Text
          fontWeight="bold"
          color="gray.900"
          fontSize={["20px", "2xl", "3xl"]}
          // fontSize={["xl", "2xl", "3xl"]}
        >
          Galeri
        </Text>
        <Grid
          templateColumns={{
            base: "1fr 1fr",
            md: "1fr 1fr 1fr",
            xl: "1fr 1fr 1fr 1fr",
          }}
          gap={8}
        >
          {gallery.map((d, index) => (
            <CardGallery
              key={index}
              image={d.image_url || "/img/tenant-banner-default.jpg"}
              judul={d.title}
              tgl={d.event_date}
              tgl_format={d.event_date_format}
              deskripsi={d.description}
            />
          ))}
        </Grid>
      </Stack>
    </Box>
  );
};

export default GalleryTenant;