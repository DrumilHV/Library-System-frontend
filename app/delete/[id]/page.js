"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { useRouter } from "next/navigation";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_SERVER;

const Page = ({ params: { operation, id } }) => {
  const router = useRouter();
  const [book, setBook] = useState([]);
  useEffect(() => {
    // Define the URL for the API request
    const url = `${BACKEND_URL}/book/${operation}/${id}`;

    // Use axios to fetch data from the API
    axios
      .delete(url, { responseType: "json" })
      .then((response) => {
        // Update the state variable bookData with the received data
        setBook(response.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle the error if needed
      });
    router.push("/");
  }, [operation, id, router]); // Run this effect only once when the component mounts

  return <h1> You are on Delete page!</h1>;
};

export default Page;
