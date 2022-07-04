import type { NextPage } from "next";
import { Typography, Box } from "@mui/material";

const Home: NextPage = () => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="body1">
        Welcome to the Real-time notes app!
      </Typography>
      <Typography variant="body1">
        Start by selecting a note, or create a note of your own.
      </Typography>
    </Box>
  );
};

export default Home;
