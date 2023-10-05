"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Search } from "@mui/icons-material";
import { Paper, IconButton } from "@mui/material";
import { bookData } from "../dummData";
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handelSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      //Add Search term here / routing
      router.push(
        `/search?search-query=${searchTerm}&pre-page=${10}&page=${0}`
      );
      setSearchTerm("");
      setSearchTerm("");
    }
  };
  return (
    <Paper
      onSubmit={handelSubmit}
      sx={{
        borderRadius: 20,
        border: "1px solod #e3e3e3",
        pl: 2,
        boxShadow: "none",
        marginRight: { sm: 5 },
      }}
      component="form"
    >
      <input
        className="search-bar"
        placeholder="Search.."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ border: "0px", outline: "none" }}
      />
      <IconButton type="submit" sx={{ color: "black", p: "10px" }}>
        <Search />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
