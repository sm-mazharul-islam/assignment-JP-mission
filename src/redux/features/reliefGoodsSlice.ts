import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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
    // 🎯 addReliefGoods মেথডটি টাইপ-সেফ অ্যাকশন সহ কমপ্লিট করা হলো
    addReliefGoods(state, action: PayloadAction<Supply>) {
      state.reliefGoods.push(action.payload);
    },

    updateSupply(
      state,
      action: PayloadAction<{ id: string; updatedData: Partial<Supply> }>,
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

    // 🗑️ ফিউচার ইউজের জন্য ডিলিট মেথড লাগলে এভাবে আইডি দিয়ে ট্র্যাকিং করতে পারো
    removeReliefGoods(state, action: PayloadAction<string>) {
      state.reliefGoods = state.reliefGoods.filter(
        (item) => item._id !== action.payload,
      );
    },
  },
});

export const { addReliefGoods, updateSupply, removeReliefGoods } =
  ReliefGoodsSlice.actions;

export default ReliefGoodsSlice.reducer;
