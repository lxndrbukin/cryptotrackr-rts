import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Cryptocurrency } from "../slices/types";

export const getHistory = createAsyncThunk(
  "data/getHistory",
  async (pair: string): Promise<Array<Array<number>>> => {
    const res = await axios.get(
      `https://api.pro.coinbase.com/products/${pair}/candles`,
      {
        params: {
          granularity: 86400,
        },
      }
    );
    return res.data;
  }
);
