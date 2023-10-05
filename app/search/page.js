// "use client";
// import { useEffect, useState } from "react";
// import Book from "../components/Book";
// import {
//   CircularProgress,
//   Pagination,
//   Typography,
//   Stack,
//   Box,
// } from "@mui/material";
// import axios from "axios";
// import Navbar from "../components/Navbar";
// import Image from "next/image";

// // import Book from "../components/Book";

// import { useSearchParams, useRouter } from "next/navigation";

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_SERVER;

// const Page = () => {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const [bookData, setBookData] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPage, setTotalPage] = useState(10);
//   const [perPage, setPerPage] = useState(10);
//   setPerPage(parseInt(searchParams.get("per-page")));

//   useEffect(() => {
//     // Define the URL for the API request
//     const url = `${BACKEND_URL}/search?search-query=${searchParams.get(
//       "search-query"
//     )}&pre-page=${10}&page=${page}`;

//     // Use axios to fetch data from the API
//     const fetchData = async () => {
//       const response = await axios.get(url, { responseType: "json" });
//       setBookData(response.data);
//       setTotalPage(Math.ceil(response.data.length / perPage));
//       // console.log(response.data[0]);
//     };
//     fetchData();
//   }, [searchParams]); // Run this effect only once when the component mounts
//   const handleChange = () => {
//     setPage(searchParams.get("page"));
//     // router.push(
//     //   `/search?search-query=${searchParams.get(
//     //     "search-query"
//     //   )}&pre-page=${10}&page=${page}`
//     // );
//   };
//   return (
//     <>
//       {bookData === undefined || bookData.length === 0 ? (
//         <CircularProgress disableShrink />
//       ) : (
//         bookData.map((book, index) => (
//           <Book book={book} key={book._id} sd={true} showBtn={true} />
//         ))
//       )}
//       <Pagination
//         count={totalPage}
//         page={page}
//         onChange={handleChange}
//         size="large"
//         // count={()=>getTotalCount()}
//         color="primary"
//         sx={{ marginLeft: { sm: "20%", md: "40%" }, fontSize: "50px" }}
//       />
//     </>
//   );
// };

// export default Page;
"use client";
import { useEffect, useState } from "react";
import Book from "../components/Book";
import { CircularProgress, Pagination } from "@mui/material";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import Link from "next/link";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_SERVER;

const Page = () => {
  const searchParams = useSearchParams();
  const [bookData, setBookData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(10);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    setPerPage(parseInt(searchParams.get("per-page")));

    // Define the URL for the API request
    const url = `${BACKEND_URL}/search?search-query=${searchParams.get(
      "search-query"
    )}&pre-page=${10}&page=${page}`;

    // Use axios to fetch data from the API
    const fetchData = async () => {
      const response = await axios.get(url, { responseType: "json" });
      setBookData(response.data);
      setTotalPage(Math.ceil(response.data.length / perPage) || 5);
    };

    fetchData();
  }, [searchParams, page, perPage]); // Update the effect's dependencies

  const handleChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <Navbar />
      {bookData === undefined ? (
        <CircularProgress disableShrink sx={{ margin: "50%" }} />
      ) : bookData.length > 0 ? (
        bookData.map((book, index) => (
          <Link
            href={`/book/bookDetails/${book._id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Book book={book} key={book._id} sd={true} showBtn={true} />
          </Link>
        ))
      ) : (
        <h1>No Such Book found!</h1>
      )}

      <Pagination
        count={totalPage}
        page={page}
        onChange={handleChange}
        size="large"
        color="primary"
      />
    </>
  );
};

export default Page;
