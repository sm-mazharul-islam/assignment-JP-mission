import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// type TReliefGoods = {
//   id: string;
//   title: string;
//   category: string;
//   description: string;
//   amount: string;
//   image: string;
// };

// type TInitialState ={
//   reliefGoods: TSupplyProps[]
// }

export interface Supply {
  _id: string;
  title: string;
  category: string;
  item: string;
  amount: number;
  description: string;
  image: string;
  reason: string;
}

export interface UpdateSupplyPayload {
  id: string; // Type of the supply id (_id)
  updatedSupply: Partial<Supply>; // Partial<Supply> allows updating only some fields
}

interface SuppliesState {
  reliefGoods: Supply[];
  loading: boolean;
  error: string | null;
}

const initialState: SuppliesState = {
  reliefGoods: [],
  loading: false,
  error: null,
};
const ReliefGoodsSlice = createSlice({
  name: "supplies",
  initialState,
  reducers: {
    addReliefGoods() {},

    updateSupply(
      state,
      action: PayloadAction<{ id: string; updatedData: Partial<Supply> }>
    ) {
      const { id, updatedData } = action.payload;
      const index = state.reliefGoods.findIndex((supply) => supply._id === id);
      if (index !== -1) {
        state.reliefGoods[index] = {
          ...state.reliefGoods[index],
          ...updatedData,
        };
      }
    },

    // removeReliefGoods(state, action) {},
    // updateReliefGoods: (state, action: PayloadAction<string>) => {
    //   const task = state.reliefGoods.find((item) => item.id === action.payload);
    //   // task!.isCompleted = !task?.isCompleted;
    // },
  },
});

export const { addReliefGoods, updateSupply } = ReliefGoodsSlice.actions;

export default ReliefGoodsSlice.reducer;
