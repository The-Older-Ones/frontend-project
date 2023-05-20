import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const apiUrl = "http://127.0.0.1/api/";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      toast.success("Login successful", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      toast.error("Login failed", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
    signupStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    signupSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      toast.success("Signup successful", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
    signupFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      toast.error("Signup failed", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  signupStart,
  signupSuccess,
  signupFailure,
} = authSlice.actions;

export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const headers = {
      Authorization: `Basic ${btoa(
        `${credentials.userID}:${credentials.password}`
      )}`,
      "Content-Type": "application/json",
    };

    const response = await fetch(apiUrl + "authenticate", {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    console.log(data);
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export const signupUser = (credentials) => async (dispatch) => {
  try {
    dispatch(signupStart());
    const response = await fetch(apiUrl + "users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) throw new Error("Signup failed!");

    const data = await response.json();
    console.log(data);
    dispatch(signupSuccess(data));
  } catch (error) {
    dispatch(signupFailure(error.message));
  }
};

export default authSlice.reducer;
