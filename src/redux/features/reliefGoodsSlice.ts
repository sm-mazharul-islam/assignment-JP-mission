import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TReliefGoods = {
  id: string;
  title: string;
  category: string;
  description: string;
  amount: string;
  image: string;
};

const initialState = {
  reliefGoods: [],
};
const ReliefGoodsSlice = createSlice({
  name: "supplies",
  initialState,
  reducers: {
    addReliefGoods(state, action) {},
    removeReliefGoods(state, action) {},
  },
});

export const { addReliefGoods } = ReliefGoodsSlice.actions;

export default ReliefGoodsSlice.reducer;
