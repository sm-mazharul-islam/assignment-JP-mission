import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

// টাইপ ডিফিনিশন
interface User {
  email: string;
  role?: string;
  name?: string;
  image?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

// লোকাল স্টোরেজ থেকে ডাটা রিস্টোর করার লজিক
const initialState: AuthState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
  token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>,
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      // লোকাল স্টোরেজে ডাটা পারসিস্ট করা
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;

      // লোকাল স্টোরেজ থেকে ডাটা রিমুভ করা
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;

// সিলেক্টর এবং টাইপড হুক
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAuth = (state: RootState) => state.auth;
