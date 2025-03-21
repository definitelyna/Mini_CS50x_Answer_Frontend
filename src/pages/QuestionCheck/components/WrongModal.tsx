import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  questionId: string;
}

const WrongModal : React.FC<Props> = ({ open, onClose, questionId }) => {
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
          <Typography variant="h4" color="error.main" gutterBottom>
            Wrong Answer
          </Typography>
          <Typography variant="body1" gutterBottom>
            That was the <span style={{fontWeight: 'bold', color: 'crimson'}}>wrong</span> answer for <span
            style={{fontWeight: 'bold'}}>{questionId}</span>. Try again.
          </Typography>
          <Button variant="contained" color="primary" onClick={onClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default WrongModal;
