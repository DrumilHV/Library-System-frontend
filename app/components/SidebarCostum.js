"use client";
import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { Input, InputLabel } from "@mui/material";

import Button from "@mui/material/Button";
import {
  CollectionsBookmark,
  Edit,
  Feedback,
  Help,
  PermMedia,
  UploadFile,
  Work,
} from "@mui/icons-material";

import { Stack } from "@mui/material";

import { useRouter } from "next/navigation";
import axios from "axios";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_SERVER;

const drawWidth = 220;

function App({
  setStartDate,
  setEndDate,
  setOrder,
  setGenre,
  setPaid,
  getQueryResult,
}) {
  const [mobileViewOpen, setMobileViewOpen] = React.useState(false);
  const router = useRouter();

  const handleToggle = () => {
    setMobileViewOpen(!mobileViewOpen);
  };
  const handelSubmit = (event) => {
    // event.preventDefault();
    getQueryResult;

    // router.push()
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCsvFile, setSelectedCsvFile] = useState(null);
  const [selectedJsonFile, setSelectedJsonFile] = useState(null);

  const CreateBook = () => {
    router.push("/create");
  };

  const handleUploadCSV = (event) => {
    event.preventDefault();
    setSelectedCsvFile(event.target.files[0]);
    const url = `${BACKEND_URL}/uplode/csv`;

    // Create a FormData object and append the selected file to it
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    console.log("in the handle csv function");
    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the correct header format
        },
      })
      .then((response) => {
        console.log("File uploaded successfully", response.data);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error uploading file", error);
      });
  };
  const handleUploadJson = (event) => {
    event.preventDefault();
    setSelectedJsonFile(event.target.files[0]);
    const url = `${BACKEND_URL}/uplode/json`;

    // Create a FormData object and append the selected file to it
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    console.log("in the handle json function");
    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the correct header format
        },
      })
      .then((response) => {
        console.log("File uploaded successfully", response.data);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error uploading file", error);
      });
  };
  const responsiveDrawer = (
    <div style={{ backgroundColor: "#fff", height: "100%", margin: "5%" }}>
      <Typography
        sx={{ textAlign: "left", p: "5%", color: "blue", fontSize: 20 }}
      >
        LibSys
      </Typography>
      <List sx={{ backgroundColor: "#fff" }}>
        <Typography fontWeight={"bold"}>Sort By</Typography>
        <FormControlLabel
          required
          control={<Checkbox />}
          onChange={() => {
            setOrder("asc");
          }}
          label={<Typography>Ascending</Typography>}
        />
        <FormControlLabel
          required
          control={<Checkbox />}
          onChange={() => setOrder("desc")}
          label={<Typography>Decending</Typography>}
        />

        <Typography fontWeight={"bold"}>Filter by</Typography>
        <Typography sx={{ margin: "5%" }}>Year</Typography>
        <TextField
          label="Start year"
          variant="outlined"
          onChange={(event) => setStartDate(event.target.value)}
        />
        <TextField
          label="End year"
          variant="outlined"
          onChange={(event) => setEndDate(event.target.value)}
        />
        <Typography sx={{ margin: "5%" }}>Paid</Typography>
        <Stack direction={"column"}>
          <FormControlLabel
            required
            control={<Checkbox />}
            onChange={() => setPaid("PAID")}
            label={<Typography>Paid</Typography>}
          />
          <FormControlLabel
            required
            control={<Checkbox />}
            onChange={() => setPaid("FREE")}
            label={<Typography>Free</Typography>}
          />
        </Stack>
      </List>
      <Divider />

      <button
        onClick={getQueryResult}
        style={{ border: "none", background: "none", padding: "5%" }}
      >
        <Button variant="contained">Search</Button>
      </button>
      <button
        onClick={CreateBook}
        style={{ border: "none", background: "none", padding: "5%" }}
      >
        <Button variant="contained" color="info">
          Create
        </Button>
      </button>

      <button
        onClick={async () => {
          try {
            const response = await axios.get(
              `${BACKEND_URL}/export-json-data`,
              {
                responseType: "blob", // Set the response type to 'blob'
              }
            );
            console.log(response);

            if (response.status === 200) {
              const blob = new Blob([response.data], {
                type: "application/json",
              });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "data.json"; // Specify the desired file name
              document.body.appendChild(a);
              a.click();
              window.URL.revokeObjectURL(url);
            } else {
              console.error("File download failed.");
            }
          } catch (error) {
            console.error("Fetch error:", error);
          }
        }}
        style={{ border: "none", background: "none", padding: "5%" }}
      >
        <Button variant="contained" color="success">
          Export Data as JSON
        </Button>
      </button>
      <button
        onClick={async () => {
          try {
            const response = await axios.get(`${BACKEND_URL}/export-csv-data`, {
              responseType: "blob", // Set the response type to 'blob'
            });

            if (response.status === 200) {
              const blob = new Blob([response.data], { type: "text/csv" }); // Specify content type as 'text/csv'
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "data.csv"; // Specify the desired file name
              document.body.appendChild(a);
              a.click();
              window.URL.revokeObjectURL(url);
            } else {
              console.error("File download failed.");
            }
          } catch (error) {
            console.error("Fetch error:", error);
          }
        }}
        style={{ border: "none", background: "none", padding: "5%" }}
      >
        <Button variant="contained" color="success">
          Export Data as CSV
        </Button>
      </button>

      <Input
        id="csv-file-input" // Unique ID for the CSV file input
        type="file"
        accept=".csv" // Specify allowed file types (CSV only)
        onChange={handleUploadCSV} // Use the handleUploadCSV function
        style={{ display: "none" }} // Hide the input element
      />
      <label htmlFor="csv-file-input">
        <Button
          variant="contained"
          color="secondary"
          component="span"
          sx={{ margin: "5%" }}
        >
          Upload CSV
        </Button>
      </label>

      <Input
        id="json-file-input" // Unique ID for the JSON file input
        type="file"
        accept=".json" // Specify allowed file types (JSON only)
        onChange={handleUploadJson} // Use the handleUploadJson function
        style={{ display: "none" }} // Hide the input element
      />
      <label htmlFor="json-file-input">
        <Button
          variant="contained"
          color="secondary"
          component="span"
          sx={{ margin: "5%" }}
        >
          Upload JSON
        </Button>
      </label>
    </div>
  );

  return (
    <div>
      <div>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />

          <Box
            component="nav"
            sx={{ width: { sm: drawWidth }, flexShrink: { sm: 0 } }}
          >
            <Drawer
              variant="temporary"
              open={mobileViewOpen}
              onClose={handleToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawWidth,
                },
              }}
            >
              {responsiveDrawer}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: "none", sm: "block" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawWidth,
                },
              }}
              open
            >
              {responsiveDrawer}
            </Drawer>
          </Box>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawWidth}px)` },
            }}
          >
            <Toolbar />
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default App;
