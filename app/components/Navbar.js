"use client";
import { AppBar, Toolbar, Typography, Stack, Box } from "@mui/material";
import Searchbar from "./Searchbar";
import SidebarCostum from "./SidebarCostum";
import AccordMenu from "./AccordMenu";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <AppBar>
        <Toolbar variant="regular">
          <Stack
            direction="row"
            // justifyContent="space-between" // Align items horizontally
            alignItems="left" // Align items vertically
          >
            <Link href="/" style={{ textDecoration: "none", color: "white" }}>
              <Typography fontWeight={"bold"}>Libsys</Typography>
            </Link>
            <Box
              sx={{
                position: "absolute",
                right: "0px",
                top: "5%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Searchbar />
              {/* <Box sx={{ right: "5%" }}>
                <AccordMenu />
              </Box> */}
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
