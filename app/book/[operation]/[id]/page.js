"use client";
import Image from "next/image";
import axios from "axios";
import { useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";

import Navbar from "@/app/components/Navbar";
import { Box, Stack, Typography } from "@mui/material";
import { CircularProgress } from "@mui/material";
import Book from "../../../components/Book";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_SERVER;

// make a fetch api here to fetch the details of the books.

const Page = ({ params: { operation, id } }) => {
  // book = book[0];
  const [book, setBook] = useState([]);
  useEffect(() => {
    // Define the URL for the API request
    const url = `${BACKEND_URL}/book/${operation}/${id}`;

    // Use axios to fetch data from the API
    axios
      .get(url, { responseType: "json" })
      .then((response) => {
        // Update the state variable bookData with the received data
        setBook(response.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle the error if needed
      });
  }, [id, operation]); // Run this effect only once when the component mounts

  return (
    <>
      {book.length == 0 ? (
        <CircularProgress
          disableShrink
          sx={{ marginLeft: "50%", marginTop: "30%" }}
        />
      ) : (
        <Stack direction={"row"}>
          <Box>
            <Navbar />
          </Box>
          <Box
            sx={{
              margin: "1%",
              marginTop: { sm: "25%", md: "15%", lg: "5%" },
              backgroundColor: "#fff",
              border: "none",
              borderRadius: "15px",
              textDecoration: "none",
            }}
          >
            <Book book={book} sd={false} showBtn={false} />
          </Box>
        </Stack>
      )}
    </>
  );
};

export default Page;
