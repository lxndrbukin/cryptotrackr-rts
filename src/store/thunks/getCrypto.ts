import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Cryptocurrency } from "../slices/types";

export const getCrypto = createAsyncThunk(
  "data/getCrypto",
  async (): Promise<Array<Cryptocurrency>> => {
    const res = await axios.get("https://api.pro.coinbase.com/products");
    return res.data;
  }
);
