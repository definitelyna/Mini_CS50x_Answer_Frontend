import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import Confetti from "react-confetti-boom";

interface Props {
  open: boolean;
  onClose: () => void;
  questionId: string;
}

const WellDoneModal : React.FC<Props> = ({ open, onClose, questionId }) => {
  return (
    <Modal open={open} onClose={onClose} BackdropProps={{ invisible: true }}>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
         backgroundColor: "rgba(255, 255, 255, 0.3)",
        }}
      >
        <Box
          sx={{
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            textAlign: "center",
            borderRadius: 2,
          }}
        >
          <Confetti mode="boom" particleCount={500} shapeSize={20} deg={270} spreadDeg={100} colors={["#ff577f", "#ff884b", "#ffd384"]} />
          <Typography variant="h4" color="success.main" gutterBottom>
            WELL DONEEEE!
          </Typography>
          <Typography variant="body1" gutterBottom>
            That was the <span style={{fontWeight: 'bold', color: 'green'}}>correct</span> answer for <span
            style={{fontWeight: 'bold'}}>{questionId}</span>!
          </Typography>
          <Button variant="contained" color="primary" onClick={onClose}>
            Close
          </Button>
        </Box>
        <Confetti mode="fall" particleCount={240} shapeSize={15} fadeOutHeight={0.8} colors={["#ff577f", "#ff884b", "#ffd384"]} />

      </Box>
    </Modal>
  );
};

export default WellDoneModal;
