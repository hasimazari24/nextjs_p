'use client'

import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from '@chakra-ui/react'

const IMAGE =
  'https://img.freepik.com/premium-vector/luxury-logo-premium-file_679076-145.jpg'

export default function Awards() {
  return (
    <Center py={4}>
      <Box
        role={'group'}
        p={4}
        maxW={'180px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'xl'}  
        pos={'relative'}
        // zIndex={1}
        >
        <Box
          rounded={'full'}
          pos={'relative'}
          height={["75px"]}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            // top: 5,
            // left: 0,
            backgroundImage: `url(${IMAGE})`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{  
            _after: {
              filter: 'blur(20px)',
            },
          }}>
          <Center>
            <Image
              rounded={'full'}
              height={["60px"]}
              width={["60px"]}
              objectFit={'cover'}
              src={IMAGE}
              alt="#"
            />
          </Center>
        </Box>
        <Stack pt={0} textAlign="center">
            <Text color={'gray.500'} fontSize={'xs'} textTransform={'uppercase'}>
              Juara 1
            </Text>
          <Text color={'gray.900'} fontSize={'xs'}textTransform={'uppercase'}>
            Best Program Product Premium Star
          </Text>
        </Stack>
      </Box>
    </Center>
  )
}
