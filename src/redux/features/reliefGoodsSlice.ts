import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reliefGoods: [],
};
const ReliefGoodsSlice = createSlice({
  name: "supplies",
  initialState,
  reducers: {},
});

export default ReliefGoodsSlice.reducer;
