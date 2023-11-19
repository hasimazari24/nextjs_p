import * as React from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { toolbarPlugin, ToolbarSlot } from "@react-pdf-viewer/toolbar";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";
import { Box } from "@chakra-ui/react";

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
              <>
                <Box padding="0px 2px">
                  <ShowSearchPopover />
                </Box>
                <Box padding="0px 2px">
                  <ZoomOut />
                </Box>
                <Box padding="0px 2px">
                  <Zoom />
                </Box>
                <Box padding="0px 2px">
                  <ZoomIn />
                </Box>
                <Box padding="0px 2px" marginLeft="auto">
                  <GoToPreviousPage />
                </Box>
                <Box padding="0px 2px" width={{ base: "4rem", md: "6rem" }}>
                  <CurrentPageInput />
                </Box>
                <Box padding="0px 2px">
                  / <NumberOfPages />
                </Box>
                <Box padding="0px 2px">
                  <GoToNextPage />
                </Box>
                <Box padding="0px 2px" marginLeft="auto">
                  <EnterFullScreen />
                </Box>
                <Box padding="0px 2px">
                  <Download />
                </Box>
                <Box padding="0px 2px">
                  <Print />
                </Box>
              </>
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
