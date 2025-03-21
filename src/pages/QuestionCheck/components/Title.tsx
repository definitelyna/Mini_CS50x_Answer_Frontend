import { Box } from "@mui/material";

const Title = () => {
    return (
        <Box sx={{ textAlign: "right", mt: 3}}>
          <h1 style={{ fontSize: 60, marginLeft: "auto" }}>
            MINI CS50x PUZZLE DAY
          </h1>
          <h3 style={{ fontWeight: "normal" }}>By STEM Society</h3>
        </Box>
    );
}

export default Title;