"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
// import Image from "next/image";
import Image from "next/legacy/image";

import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { Box, Button, Stack, Typography } from "@mui/material";
import Navbar from "@/app/components/Navbar";
import { useRouter } from "next/router";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_SERVER;

const Page = ({ params: { id } }) => {
  const sd = false;
  const formStyle = {
    minWidth: "100%",
    border: "2px solid balck",
    borderRadius: "10px",
    fontSize: "20px",
    fontFamily: "initial",
  };
  // const router = useRouter()
  const [book, setBook] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState(book.title || "");
  const [authers, setAuthers] = useState(book.authors || "");
  const [isbn, setIsbn] = useState(book.isbn || "");
  const [pages, setPages] = useState(book.pagecount || "");
  const [longdescription, setLongDescription] = useState(
    book.longdescription || ""
  );
  const [shortdescription, setShortDescription] = useState(
    book.shortdescription || ""
  );
  const [status, setStatus] = useState(book.status || "PUBLIS");
  const [publisheddate, setPublisheddate] = useState(book.publisheddate || "");
  const [price, setPrice] = useState(book.price || "");
  const [thumbnailurl, setThumbnail] = useState(book.thumbnailurl || "");
  const [categories, setCategories] = useState(book.categories || "");
  const [paid, setPaid] = useState(book.paid || "FREE");
  useEffect(() => {
    const url = `${BACKEND_URL}/book/bookDetils/${id}`;

    const fetchData = async () => {
      const response = await axios.get(url, { responseType: "json" });
      setBook(response.data[0]);
      setThumbnail(response.data[0].thumbnailurl);
      setAuthers(response.data[0].authers);
      setTitle(response.data[0].title);
      setPages(response.data[0].pagecount);
      setLongDescription(response.data[0].longdescription);
      setShortDescription(response.data[0].shortdescription);
      setPaid(response.data[0].paid);
      setCategories(response.data[0].categories);
      setIsbn(response.data[0].isbn);
      setStatus(response.data[0].status);
      setPublisheddate(response.data[0].publisheddate);
    };
    fetchData();
  }, [isLoading, id]);

  const handleUpdate = async () => {
    // if (!isLoading && Object.keys(book).length > 0) {
    {
      setIsLoading(true);

      const updatedBook = {
        title: title,
        isbn: isbn,
        pagecount: pages,
        publisheddate: publisheddate,
        thumbnailurl: thumbnailurl,
        shortdescription: shortdescription,
        longdescription: longdescription,
        status: status,
        authors: authers,
        categories: categories,
        paid: paid,
        price: price,
      };

      console.log("This is updated books ->>\n\n", updatedBook);
      // const response =  axios.patch(
      axios.patch(`${BACKEND_URL}/book/update/${id}`, updatedBook);
      // router.push(`/`);
    }
  };

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
          width: "95%",
        }}
      >
        <Stack direction={"row"}>
          <Box sx={{ margin: "2%" }}>
            <Image
              src={book.thumbnailurl}
              height={300}
              width={200}
              style={{ objectFit: "cover", overflow: "hidden" }}
              alt={book.title}
            />
          </Box>
          <Stack direction={"column"}>
            <Typography fontWeight={"bold"}>Title</Typography>
            <textarea
              defaultValue={book.title}
              style={formStyle}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Typography fontWeight={"bold"}>Image:</Typography>
            <textarea
              defaultValue={book.thumbnailurl}
              style={formStyle}
              onChange={(e) => setThumbnail(e.target.value)}
            />

            <Typography>
              by{" "}
              <textarea
                defaultValue={book.authors}
                style={formStyle}
                onChange={(e) => setAuthers(e.target.value)}
              />
            </Typography>

            <Typography fontWeight={"bold"}>ISBN:</Typography>

            <textarea
              defaultValue={book.isbn}
              style={formStyle}
              onChange={(e) => setIsbn(e.target.value)}
            />
            <Typography fontWeight={"bold"}>PAGES:</Typography>

            <textarea
              defaultValue={book.pagecount}
              style={formStyle}
              onChange={(e) => setPages(e.target.value)}
              rows={4}
              cols={100}
            />
            <Typography fontWeight={"bold"}>Short Description:</Typography>

            <textarea
              style={formStyle}
              defaultValue={book.shortdescription}
              rows={5}
              onChange={(e) => setShortDescription(e.target.value)}
            />
            <Typography fontWeight={"bold"}>Long Description:</Typography>
            <textarea
              style={formStyle}
              defaultValue={book.longdescription}
              onChange={(e) => setLongDescription(e.target.value)}
              rows={4}
            />

            <Typography fontWeight={"bold"}>Status:</Typography>
            <select
              defaultValue={book.status}
              style={formStyle}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value={"PUBLIS"}>PUBLISH</option>
              <option value={"NOT PUBLISH"}>NOT PUBLISH</option>
            </select>

            <Typography fontWeight={"bold"}>
              Published Date (yyyy-mm-dd format):
            </Typography>

            <textarea
              defaultValue={book.publisheddate}
              style={formStyle}
              onChange={(e) => setPublisheddate(e.target.value)}
            />
            <Typography fontWeight={"bold"}>Price ₹</Typography>

            <textarea
              defaultValue={book.price}
              style={formStyle}
              onChange={(e) => setPrice(e.target.value)}
            />
            <Typography fontWeight={"bold"}>Paid:</Typography>

            <select
              defaultValue={book.paid}
              style={formStyle}
              onChange={(e) => setPaid(e.target.value)}
            >
              <option value={"FREE"}>FREE</option>
              <option value={"PAID"}>PAID</option>
            </select>

            <Typography fontWeight={"bold"}>
              Category (comma-separated):
            </Typography>
            <textarea
              defaultValue={book.categories}
              style={formStyle}
              onChange={(e) => setCategories(e.target.value)}
            />
            {
              <Stack direction={"row"}>
                <Link href={"/"}>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{}}
                    onClick={handleUpdate}
                  >
                    <Typography fontWeight={"bold"}>UPDATE</Typography>
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

export default Page;
