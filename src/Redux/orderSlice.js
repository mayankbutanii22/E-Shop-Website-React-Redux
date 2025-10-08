import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../API/axios.js";

const dummyOrders = Array.from({ length: 10 }, (_, i) => ({
  _id: `ORD-${1000 + i}`,
  user: ["Riya Patel", "Aarav Mehta", "Priya Shah", "Mayank Butani"][i % 4],
  createdAt: new Date(Date.now() - i * 86400000).toISOString(),
  totalPrice: (Math.random() * 10000 + 1000).toFixed(0),
  isDelivered: i % 2 === 0,
}));

export const placeOrder = createAsyncThunk("orders/place", async (orderData) => {
  const { data } = await API.post("/orders", orderData);
  return data;
});

export const fetchOrders = createAsyncThunk(
  "orders/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/orders/myorders");
      return Array.isArray(data) ? data : dummyOrders;
    } catch {
      return rejectWithValue(dummyOrders);
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: { items: [], status: "idle", error: null, lastOrder: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.lastOrder = action.payload;
        state.items.push(action.payload);
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.items = Array.isArray(action.payload)
          ? action.payload
          : dummyOrders;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.items = dummyOrders;
      });
  },
});

export default ordersSlice.reducer;

