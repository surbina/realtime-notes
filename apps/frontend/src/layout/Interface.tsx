import { ReactNode } from "react";
import {
  Toolbar,
  Typography,
  Drawer,
  Divider,
  Box,
  Container,
} from "@mui/material";
import { NotesList, Note } from "../notes";
import { useRouter } from "next/router";

const drawerWidth = 240;

interface InterfaceProps {
  children?: ReactNode;
  initialNotes: Array<Note>;
}

export function Interface({ children, initialNotes }: InterfaceProps) {
  const router = useRouter();
  const { id } = router.query;
  const activeNoteId = String(id);

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Notes
          </Typography>
        </Toolbar>
        <Divider />
        <NotesList activeNoteId={activeNoteId} initialNotes={initialNotes} />
        <Divider />
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          backgroundColor: "#eee",
          overflow: "auto",
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
}
