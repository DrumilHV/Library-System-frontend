"use client";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Book from "../components/Book";
import { Stack } from "@mui/material";
import SidebarCostum from "../components/SidebarCostum";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CircularProgress, Pagination, Typography } from "@mui/material";
import dotenv from "dotenv";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_SERVER;

const Page = () => {
  const searchParams = useSearchParams();
  const [bookData, setBookData] = useState([]);
  const [page, setPage] = useState(1);
  const [countPerPage, setCountPerPage] = useState(10);
  const [totalPage, setTotalPage] = useState(10);
  const handleChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `&start-date=${searchParams.get(
          "start-date"
        )}&end-date=${searchParams.get("end-date")}&order=${searchParams.get(
          "order"
        )}&genre=${searchParams.get("genre")}&paid=${searchParams.get(
          "paid"
        )}&page=${page}&per-page=${countPerPage}`;
        const url = `${BACKEND_URL}/query?${query}`;
        console.log(url);
        const countUrl = `${BACKEND_URL}/query/count`;

        const response = await axios.get(url, { responseType: "json" });
        setBookData(response.data);
        const countResponse = await axios.get(countUrl, {
          responseType: "json",
          params: {
            "start-date": searchParams.get("start-date"),
            "end-date": searchParams.get("end-date"),
            order: searchParams.get("order"),
            genre: searchParams.get("genre"),
            paid: searchParams.get("paid"),
          },
        });
        const totalCount = countResponse.data[0].count;
        setTotalPage(Math.ceil(totalCount / countPerPage));
        console.log(totalCount);
        // const response
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    setPage(page);
    fetchData();
  }, [page, countPerPage, searchParams]);
  // let val = bookData == undefined || bookData.length == 0;

  return (
    <>
      {bookData == undefined || bookData.length == 0 ? (
        <CircularProgress
          disableShrink
          sx={{ marginLeft: "50%", marginTop: "30%" }}
        />
      ) : (
        <>
          <Stack direction={"row"}>
            <Navbar />
            <Stack sx={{ marginTop: "5%" }}>
              {bookData.length === 0 ? ( // Check if bookData is empty
                <h1>No data available.</h1> // Display a message when there's no data
              ) : (
                bookData.map((book) => (
                  <Link
                    key={book._id}
                    href={`/book/bookDetils/${book._id}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Book key={book._id} book={book} sd={true} showBtn={true} />{" "}
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
};

export default Page;
