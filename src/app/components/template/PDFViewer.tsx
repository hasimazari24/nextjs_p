import * as React from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { toolbarPlugin, ToolbarSlot } from "@react-pdf-viewer/toolbar";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";
import {
  Box,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  HStack,
  PopoverTrigger,
  Stack,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";

interface PDFViewerProps {
  fileUrl: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ fileUrl }) => {
  const toolbarPluginInstance = toolbarPlugin();
  const { Toolbar } = toolbarPluginInstance;
  const versiTanpaCaret = process.env.pdfjsVersion?.replace(/^\^/, "");

  return (
    <Box
      className="rpv-core__viewer"
      borderWidth="1px"
      borderColor="rgba(0, 0, 0, 0.3)"
      display="flex"
      flexDirection="column"
      height="100%"
    >
      <Box
        alignItems="center"
        backgroundColor="#eeeeee"
        borderBottom="1px solid rgba(0, 0, 0, 0.1)"
        display="flex"
        padding="4px"
      >
        <Toolbar>
          {(props: ToolbarSlot) => {
            const {
              CurrentPageInput,
              Download,
              EnterFullScreen,
              GoToNextPage,
              GoToPreviousPage,
              NumberOfPages,
              Print,
              ShowSearchPopover,
              Zoom,
              ZoomIn,
              ZoomOut,
            } = props;

            return (
              <Stack justifyContent="space-between" direction={"row"} w="full">
                <HStack spacing={0}>
                  <Box margin="0">
                    <ShowSearchPopover />
                  </Box>
                  <Box margin="0">
                    <ZoomOut />
                  </Box>
                  <Box margin="0">
                    <Zoom />
                  </Box>
                  <Box margin="0">
                    <ZoomIn />
                  </Box>
                </HStack>
                <HStack spacing={0}>
                  <Box display={{ base: "none", lg: "flex" }}>
                    <GoToPreviousPage />
                  </Box>
                  <Box width={{ base: "50px", lg: "4rem" }} pr="5px">
                    <CurrentPageInput />
                  </Box>
                  <Box>
                    &nbsp;/ <NumberOfPages />
                  </Box>
                  <Box display={{ base: "none", lg: "flex" }}>
                    <GoToNextPage />
                  </Box>
                </HStack>

                {/* <div style={{ padding: "0px 2px" }}>
                  <MoreActionsPopover toolbarSlot={props} />
                </div> */}
                <HStack spacing={0}>
                  <Box display={{ base: "none", lg: "flex" }}>
                    <EnterFullScreen />
                  </Box>
                  <Box display={{ base: "none", lg: "flex" }}>
                    <Download />
                  </Box>
                  <Box display={{ base: "none", lg: "flex" }}>
                    <Print />
                  </Box>
                  <Box display={{ base: "flex", lg: "none" }}>
                    <Popover placement="bottom">
                      <PopoverTrigger>
                        <IconButton
                          aria-label="More server options"
                          icon={<BsThreeDotsVertical />}
                          variant="solid"
                          w="fit-content"
                        />
                      </PopoverTrigger>
                      <PopoverContent
                        w="fit-content"
                        _focus={{ boxShadow: "none" }}
                      >
                        <PopoverArrow />
                        <PopoverBody>
                          <Box>
                            <EnterFullScreen />
                          </Box>
                          <Box>
                            <Download />
                          </Box>
                          <Box>
                            <Print />
                          </Box>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </Box>
                </HStack>
              </Stack>
            );
          }}
        </Toolbar>
      </Box>
      <Box minHeight={{ base: "360px", md: "500px" }} height="75vh">
        <Worker
          workerUrl={`https://unpkg.com/pdfjs-dist@${versiTanpaCaret}/build/pdf.worker.min.js`}
        >
          <Viewer fileUrl={fileUrl} plugins={[toolbarPluginInstance]} />
        </Worker>
      </Box>
    </Box>
  );
};

export default PDFViewer;
