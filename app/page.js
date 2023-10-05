"use client";
import Image from "next/image";
import Navbar from "./components/Navbar";
import Book from "./components/Book";
import { Stack, Box } from "@mui/material";
import SidebarCostum from "./components/SidebarCostum";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CircularProgress, Pagination, Typography } from "@mui/material";
import dotenv from "dotenv";
import Link from "next/link";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_SERVER;

export default function Home() {
  const [bookData, setBookData] = useState([]); // Initialize bookData as an empty array
  const [page, setPage] = useState(1);
  const [countPerPage, setCountPerPage] = useState(10);
  const [totalPage, setTotalPage] = useState(10);
  const [startDate, setStartDate] = useState(1900);
  const [endDate, setEndDate] = useState(2030);
  const [order, setOrder] = useState("asc");
  const [genre, setGenre] = useState("");
  const [paid, setPaid] = useState("PAID");
  let totalCount;
  const handleChange = (event, value) => {
    setPage(value);
  };
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currnetQuery = `page=${page}&per-page=${countPerPage}`;
        //&start-date=${startDate}&end-date=${endDate}&order=${order}&genre=${genre}&paid=${paid}
        const url = `${BACKEND_URL}/home?${currnetQuery}`;
        const countUrl = `${BACKEND_URL}/home/count`;

        // router.push(currnetQuery)

        // Fetch book data
        const response = await axios.get(url, { responseType: "json" });
        setBookData(response.data);

        // Fetch total count and calculate total pages
        const countResponse = await axios.get(countUrl, {
          responseType: "json",
        });
        const totalCount = countResponse.data[0].count;
        setTotalPage(Math.ceil(totalCount / countPerPage));
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error if needed
      }
    };

    fetchData();
  }, [page, countPerPage, startDate, endDate, order, paid, genre]);
  const getQueryResult = () => {
    router.push(
      `/queryData?&start-date=${startDate}&end-date=${endDate}&order=${order}&genre=${genre}&paid=${paid}`
    );
  };
  return (
    <>
      {bookData === undefined || bookData.length == 0 ? (
        <CircularProgress
          disableShrink
          sx={{ marginLeft: "50%", marginTop: "30%" }}
        />
      ) : (
        <>
          <Stack direction={"row"}>
            <SidebarCostum
              setEndDate={setEndDate}
              setStartDate={setStartDate}
              setGenre={setGenre}
              setOrder={setOrder}
              setPaid={setPaid}
              getQueryResult={getQueryResult}
            />
            <Box>
              <Navbar />
            </Box>
            <Stack sx={{ marginTop: "5%" }}>
              {(bookData === undefined || bookData.length) === 0 ? ( // Check if bookData is empty
                <h1>No data available.</h1> // Display a message when there's no data
              ) : (
                bookData.map((book) => (
                  <Link
                    key={book._id}
                    href={`/book/bookDetils/${book._id.toString()}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Book key={book._id} book={book} sd={true} />
                  </Link>
                ))
              )}
            </Stack>
          </Stack>

          <Pagination
            count={totalPage}
            page={page}
            onChange={handleChange}
            size="large"
            // count={()=>getTotalCount()}
            color="primary"
            sx={{ marginLeft: { sm: "20%", md: "40%" }, fontSize: "50px" }}
          />
        </>
      )}
    </>
  );
}
