"use client";
import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Navbar from "./Navbar";

import Link from "next/link";
import { useRouter } from "next/router";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_SERVER;

const Book = ({ book, sd, showBtn }) => {
  // const router = useRouter();
  // const handleUpdate = (event) => {
  //   event.preventDefault();
  //   router.push(`/update/${book._id.toString()}`);
  // };
  const buttonStyle = {
    margin: "2%",
  };
  const handelDelete = () => {};
  return (
    <Stack direction={"row"}>
      <Box>
        <Navbar />
      </Box>
      <Box
        sx={{
          margin: "1%",
          marginTop: { sm: "25%", md: "15%", lg: "5%" },
          backgroundColor: "#fff",
          border: "1px solid grey",
          borderRadius: "15px",
          textDecoration: "none",
          // minWidth: "100%",
          width: "95%",
        }}
      >
        <Stack direction={"row"}>
          <Image
            src={book.thumbnailurl}
            height={300}
            width={200}
            style={{ border: "none", borderRadius: "15px" }}
            objectFit="cover"
            overflow="hidden"
            alt={book.title}
          />
          <Stack direction={"column"} sx={{ margin: "2%", width: "80%" }}>
            <Typography fontWeight={"bold"}>{book.title}</Typography>
            <Typography>
              by {book.authors ? book.authors.join(" , ") : " "}
            </Typography>
            <Stack direction={"row"}>
              <Typography fontWeight={"bold"} sx={{ marginRight: "1px" }}>
                ISBN:{" "}
              </Typography>{" "}
              {book.isbn}
            </Stack>
            <Typography>{book.pagecount} pages</Typography>
            <Typography fontWeight={"bold"}>Description: </Typography>
            {sd ? (
              <Typography sx={{ minWidth: "100%" }}>
                {book.shortdescription}
              </Typography>
            ) : (
              <Typography>{book.longdescription}</Typography>
            )}
            <Typography fontWeight={"bold"}>Status:</Typography>
            {book.status} on {book.publisheddate}
            <Typography fontWeight={"bold"}>₹ {book.price}</Typography>
            {
              <Stack direction={"row"}>
                <Link href={`/update/${book._id.toString()}`}>
                  <Button variant="contained" color="success" sx={buttonStyle}>
                    <Typography fontWeight={"bold"}>UPDATE</Typography>
                  </Button>
                </Link>
                <Link href={`/delete/${book._id.toString()}`}>
                  <Button variant="contained" color="error" sx={buttonStyle}>
                    <Typography fontWeight={"bold"}>DELETE</Typography>
                  </Button>
                </Link>
              </Stack>
            }
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Book;
