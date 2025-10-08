import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../API/axios.js";

// --- 5 categories ---
const categories = ["Electronics", "Fashion", "Home", "Toys", "Beauty"];

// --- 40 product images (8 per category) ---
const categoryImages = {
   Electronics: [
    {
      title: "Camera",
      image: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Logicool_StreamCam_%28cropped%29.jpg",
    },
    {
      title: "Dual Wireless Charger",
      image: "https://cdn.schumacherelectric.com/wp-content/uploads/2022/03/SC1591-image-1schu__53337.1646414873.1280.1280.webp",
    },
    {
      title: "Wireless Earbuds",
      image: "https://media.wired.com/photos/677cd3b881b5534cbfed636a/master/w_1600%2Cc_limit/TD_PEPCOM_2025_01_06_012.jpg",
    },
    {
      title: "Amazon Echo",
      image: "https://i.pcmag.com/imagery/reviews/00EU3U5rRoe9swRlkJE2yDa-1.fit_lim.size_759x.v1601052236.jpg",
    },
    {
      title: "Ecobee Smart Thermostat",
      image: "https://m.media-amazon.com/images/I/51jaKmwzjNL._UF894,1000_QL80_.jpg",
    },
    {
      title: "Projectors",
      image: "https://assets.bizclikmedia.net/668/59e9558d5c6655c416e72733154bb5df:257449fedb8597deee0ce082a1a8b3d5/lg-1.jpg",
    },
    {
      title: "Vega Headphones",
      image: "https://i5.walmartimages.com/seo/VILINICE-Noise-Cancelling-Headphones-Wireless-Bluetooth-Over-Ear-Headphones-with-Microphone-Black-Q8_b994b99c-835f-42fc-8094-9f6be0f9273b.be59955399cdbd1c25011d4a4251ba9b.jpeg",
    },
    {
      title: "Security Cameras",
      image: "https://cartcoders.com/blog/wp-content/uploads/2025/04/smart-bulb-1024x576.webp",
    },
  ],
  Fashion: [
   {
      title: "Allen Solly",
      image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQQTKhx55UsVNqUzZATJnfSovyD1HZI-6UFNsa7uj8mR9F5RML2",
    },
    {
      title: "Gucci",
      image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR5w0fAE-IPIv_xpLEIAwTJeUc4eKFoo1NvmHVpFzEjH4kAgo89",
    },
    {
      title: "Jewelry",
      image: "https://adoric.com/blog/wp-content/uploads/2022/11/Jewelry.jpg",
    },
    {
      title: "Women Jeans",
      image: "https://i.pinimg.com/originals/3a/10/00/3a1000ee9cc6dc90d6d29a3f4acd5ea4.jpg",
    },
    {
      title: "Hoodie",
      image: "https://nobero.com/cdn/shop/files/222C021C-8EFF-4A86-A782-A25876663738.jpg?v=1732879745",
    },
    {
      title: "Coat",
      image: "https://d1fufvy4xao6k9.cloudfront.net/images/blog/posts/2024/09/thumb/stl_coat_1-3.jpg",
    },
    {
      title: "Hermes",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/Herm%C3%A8s.svg/1200px-Herm%C3%A8s.svg.png",
    },
    {
      title: "Chinos Pants",
      image: "https://vader-prod.s3.amazonaws.com/1726000530-mhl-chinos-dockers-4426-66e0ad8d3316d.jpg",
    },
  ],
  Home: [
   {
      title: "Geyser",
      image: "https://m.media-amazon.com/images/G/31/CookwareDining/Jupiter25/SAPage/Halo/02._SS600_QL85_.jpg",
    },
    {
      title: "Water Purifier",
      image: "https://m.media-amazon.com/images/G/31/CookwareDining/Jupiter25/SAPage/Halo/UpdtHalo/water-purifier._SS600_QL85_.jpg",
    },
    {
      title: "Air Fryer",
      image: "https://m.media-amazon.com/images/G/31/CookwareDining/Jupiter25/SAPage/Halo/UpdtHalo/Air-fryers._SS600_QL85_.jpg",
    },
    {
      title: "Mixer Grinder",
      image: "https://m.media-amazon.com/images/G/31/CookwareDining/Jupiter25/SAPage/Halo/UpdtHalo/Mixer-grinder._SS600_QL85_.jpg",
    },
    {
      title: "Gas Stove",
      image: "https://m.media-amazon.com/images/G/31/CookwareDining/Jupiter25/KDPage/Halo/7._SS600_QL85_.jpg",
    },
    {
      title: "Kettle",
      image: "https://m.media-amazon.com/images/G/31/CookwareDining/Jupiter25/SAPage/Halo/UpdtHalo/Kettles._SS600_QL85_.jpg",
    },
    {
      title: "Sandwich Maker",
      image: "https://m.media-amazon.com/images/G/31/CookwareDining/Jupiter25/SAPage/Halo/UpdtHalo/Sandwich-maker._SS600_QL85_.jpg",
    },
    {
      title: "Vacuum Cleaner",
      image: "https://m.media-amazon.com/images/G/31/CookwareDining/Jupiter25/SAPage/Halo/UpdtHalo/Vacuum-cleaner._SS600_QL85_.jpg",
    },
  ],
  Toys: [
    {
      title: "Battery Charger",
      image: "https://m.media-amazon.com/images/I/31XVRKTkt4L._AC._SR240,240.jpg",
    },
    {
      title: "Drones",
      image: "https://m.media-amazon.com/images/I/41dIohBK8xL._AC._SR240,240.jpg",
    },
    {
      title: "Animal",
      image: "https://m.media-amazon.com/images/I/41prCnl9ppL._AC._SR240,240.jpg",
    },
    {
      title: "Doll",
      image: "https://funskoolindia.com/wp-content/uploads/2024/08/Melody-dolls.png",
    },
    {
      title: "Train Track",
      image: "https://m.media-amazon.com/images/I/41aPGMT2T5L._AC._SR240,240.jpg",
    },
    {
      title: "Cars And Radio Controlled",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Xe_%C3%94_T%C3%B4_%C4%90i%E1%BB%87n_Tr%E1%BA%BB_Em_Maybach_S650_-_Smart_Baby.jpg/250px-Xe_%C3%94_T%C3%B4_%C4%90i%E1%BB%87n_Tr%E1%BA%BB_Em_Maybach_S650_-_Smart_Baby.jpg",
    },
    {
      title: "Toddler",
      image: "https://m.media-amazon.com/images/G/31/img23/Toys/Jupiter25P2/Toddler._CB798024301_.png",
    },
    {
      title: "Educational Toys",
      image: "https://m.media-amazon.com/images/G/01/US-hq/2023/img/Toys_Internet/XCM_CUTTLE_1666567_3542334_320x320_2X_en_US._SS290_QL85_.jpg",
    },
  ],
  Beauty: [
    {
      title: "Mascara",
      image: "https://www.maybelline.com/-/media/project/loreal/brand-sites/mny/americas/us/eye-makeup/mascara/lash-sensational-sky-high-waterproof-mascara-makeup/maybelline-lash-sensational-sky-high-wtp-803-brownish-black-041554590913-o.jpg?rev=ffd3c2fd9a864cb3859d7a7c5ab34354",
    },
    {
      title: "Airbrush Foundation",
      image: "https://swissbeauty.in/cdn/shop/products/B.jpg?v=1748633771&width=340",
    },
    {
      title: "Highlighter",
      image: "https://swissbeauty.in/cdn/shop/files/SB-810_01_FOP2_0bbfafad-3899-47e1-87e7-063242897070.jpg?v=1748634609&width=340",
    },
    {
      title: "Face Powder",
      image: "https://swissbeauty.in/cdn/shop/files/SB-403_1C.png?v=1748634582&width=340",
    },
    {
      title: "Gold Serum",
      image: "https://assets.vogue.com/photos/668f2b94957cd09cda622675/3:4/w_748%2Cc_limit/Amazon%2520Prime%2520Day_Slidesx_0031_Beauty%2520of%2520Joseon%2520Glow%2520Serum_Kiana.jpg",
    },
    {
      title: "Biotique",
      image: "https://lh3.googleusercontent.com/5owKNcVmIf70DdEY2Po-I48YWLfrLu_0OaU9P09LKuPP3650Fe50oxzeUbf6egY-AkGp8W_mwiXgEnK4eCQJGkJG2PzsRtU2yuetgtud=w1000",
    },
    {
      title: "Makeup Brand",
      image: "https://indian-retailer.s3.ap-south-1.amazonaws.com/s3fs-public/inline-images/new%204.jpg",
    },
    {
      title: "Skincare",
      image: "https://images-static.naikaa.com/beauty-blog/wp-content/uploads/2023/06/Korean-Skincare-Products.jpg",
    },
  ],
};


const dummyProducts = categories.flatMap((cat) =>
  categoryImages[cat].map((item, i) => ({
    _id: `${cat.slice(0, 3).toUpperCase()}-${i + 1}`,
    name: item.title,
    image: item.image,
    category: cat,
    price: Math.round((Math.random() * 9000 + 100) * 100) / 100,
    description: `High-quality ${cat.toLowerCase()} product number ${
      i + 1
    }. Perfect for daily use and gifting.`,
    rating: (Math.random() * 2 + 3).toFixed(1),
    countInStock: Math.floor(Math.random() * 20) + 1,
  }))
);

// --- Fetch Products from API or Fallback to Dummy ---
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/products");
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data.products)
        ? data.products
        : [];
      return list.length ? list : dummyProducts;
    } catch {
      return rejectWithValue(dummyProducts);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: { items: [], status: "idle", error: null },
  reducers: {
    addProduct: (state, action) => {
      state.items.push(action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.items.findIndex((p) => p._id === action.payload._id);
      if (index !== -1) state.items[index] = action.payload;
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter((p) => p._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = Array.isArray(action.payload)
          ? action.payload
          : dummyProducts;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "succeeded";
        state.items = Array.isArray(action.payload)
          ? action.payload
          : dummyProducts;
      });
  },
});

export const { addProduct, updateProduct, deleteProduct } =
  productsSlice.actions;
export default productsSlice.reducer;