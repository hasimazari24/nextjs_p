import { Box, VStack,Stack, HStack, TagLeftIcon } from "@chakra-ui/react";
import * as React from "react";
import { IconType } from "react-icons";
import { BiGlobe } from "react-icons/bi";
import SocialInfo from "./MediaSocial";
import { AiFillTwitterCircle, AiOutlineFacebook, AiOutlineGlobal } from "react-icons/ai";
import { IoLogoFacebook, IoLogoInstagram, IoLogoLinkedin, IoLogoYoutube } from "react-icons/io5";




const DetailSocial = () => {
    return (
        <Stack 
        spacing={4}
        w="full"
        >
            <Box>
                <VStack spacing={4}  
                flexWrap={"wrap"}
                alignItems={'flex-start'} 
                justifyContent={'flex-start'}
                >
                    <SocialInfo
                        icon={AiOutlineGlobal}
                        title="Website"
                        content="tokopedia.com tokopedia.comtokopedia.comtokopedia.com"
                        href="https://www.tokopedia.com/"
                        label="website"                        
                    />
                    <SocialInfo
                        icon={AiFillTwitterCircle}
                        title="Twitter"
                        content="twitter.com/tokopediadasdasdas"
                        href="https://twitter.com/tokopedia"
                        label="twitter"                        
                    />
                    <SocialInfo
                            icon={IoLogoInstagram}
                            title="Instagram"
                            content="instagram.com/tokopedia"
                            href="https://www.instagram.com/tokopedia/"
                            label="instagram"                        
                    />
                    <SocialInfo
                        icon={IoLogoYoutube}
                        title="Youtube"
                        content="youtube.com/tokopedia"
                        href="https://www.youtube.com/@tokopedia"
                        label="youtube"                        
                    />
                    <SocialInfo
                            icon={IoLogoFacebook}
                            title="Facebook"
                            content="facebook.com/tokopedia"
                            href="https://www.facebook.com/tokopedia"
                            label="facebook"                        
                    />
                    <SocialInfo
                        icon={IoLogoLinkedin}
                        title="LinkedIn"
                        content="linkedin.com/tokopedia"
                        href="https://www.linkedin.com/company/pt--tokopedia"
                        label="linkedin"                        
                    />

                </VStack>
            </Box>
        </Stack>

    );
};

export default DetailSocial;