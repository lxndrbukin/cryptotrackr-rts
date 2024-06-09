import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DataProps, Cryptocurrency } from "./types";
import { getCrypto } from "../thunks/getCrypto";
import { getHistory } from "../thunks/getHistory";

const initialState: DataProps = {
  currencies: [],
  pair: "BTC-USD",
  price: "0.00",
  historical: undefined,
};

const data = createSlice({
  name: "data",
  initialState,
  reducers: {
    changePair(state: DataProps, action: PayloadAction<string>) {
      state.pair = action.payload;
    },
    setPrice(state: DataProps, action: PayloadAction<string>) {
      state.price = action.payload;
    },
  },
  extraReducers: (builder): void => {
    builder.addCase(
      getCrypto.fulfilled,
      (
        state: DataProps,
        action: PayloadAction<Array<Cryptocurrency>>
      ): void => {
        state.currencies = action.payload;
      }
    );
    builder.addCase(
      getHistory.fulfilled,
      (state: DataProps, action: PayloadAction<Array<Array<number>>>): void => {
        state.historical = action.payload;
      }
    );
  },
});

export default data.reducer;
export const { changePair, setPrice } = data.actions;
