// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   currentUser: JSON.parse(localStorage.getItem("user")) || null,
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     login: (state, action) => {
//       state.currentUser = action.payload;
//       localStorage.setItem("user", JSON.stringify(action.payload));
//     },
//     logout: (state) => {
//       state.currentUser = null;
//       localStorage.removeItem("user");
//     },
//   },
// });

// export const { login, logout } = userSlice.actions;
// export default userSlice.reducer;
