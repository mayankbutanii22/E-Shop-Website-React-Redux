import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../API/axios.js";

// --- Dummy Users (fallback if API fails) ---
const dummyUsers = [
  {
    name: "Mayank Butani",
    email: "mayankbutanii22@gmail.com",
    password: "abcd@228", 
    isAdmin: true,
    avatar: "/1000015783[1].jpg",
    address: "Talali, Kunkavav, Amreli, Gujarat",
    phone: "",
  },
];

// --- Async Thunks ---
export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/users/login", credentials);
      return data;
    } catch {
      const user = dummyUsers.find(
        (u) =>
          u.email === credentials.email && u.password === credentials.password
      );

      if (user) {
         
        const safeUser = { ...user };
        delete safeUser.password;
        return { user: safeUser, token: "dummy-token" };
      } else {
        return rejectWithValue({ message: "Invalid email or password" });
      }
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/signup",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/users", payload);
      return data;
    } catch {
      const newUser = {
        name: payload.name,
        email: payload.email,
        avatar: "/1000015783[1].jpg",
        address: "Not provided",
        phone: "Not provided",
      };
      return { user: newUser, token: "dummy-token" };
    }
  }
);

export const fetchAllUsers = createAsyncThunk(
  "user/fetchAll",
  async () => {
    try {
      const { data } = await API.get("/users");
      return Array.isArray(data) && data.length ? data : dummyUsers;
    } catch {
      return dummyUsers;
    }
  }
);

// --- Slice ---
const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: JSON.parse(localStorage.getItem("userInfo") || "null"),
    allUsers: [],
    status: "idle",
    error: null,
  },
  reducers: {
    logout(state) {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
    },
    updateProfile(state, action) {
      state.userInfo = { ...state.userInfo, ...action.payload };
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userInfo = action.payload.user;
        localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Login failed";
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userInfo = action.payload.user;
        localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
        localStorage.setItem("token", action.payload.token);
      })

      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload;
      });
  },
});

export const { logout, updateProfile } = userSlice.actions;
export default userSlice.reducer;












