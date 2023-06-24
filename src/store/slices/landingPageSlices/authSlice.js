import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { closeModal } from './loginSlice';
import jwt_decode from 'jwt-decode';

const URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:80/api/';
const ROUTER_URL = process.env.REACT_APP_BACKEND_ROUTER_URL;
const apiUrl = URL;
const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: null,
		isLoading: false,
		error: null,
		accessToken: null,
	},
	reducers: {
		loginStart: (state) => {
			state.isLoading = true;
			state.error = null;
		},
		loginSuccess: (state, action) => {
			state.isLoading = false;
			state.user = action.payload.user;

			state.accessToken = action.payload.token;
			toast.success('Login successful', {
				position: 'bottom-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
			});
		},
		loginFailure: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
			toast.error(action.payload, {
				position: 'bottom-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
			});
		},
		signupStart: (state) => {
			state.isLoading = true;
			state.error = null;
		},
		signupSuccess: (state, action) => {
			state.isLoading = false;
			state.user = action.payload;
			toast.success('Signup successful', {
				position: 'bottom-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
			});
		},
		signupFailure: (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
			toast.error(action.payload, {
				position: 'bottom-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
			});
		},
	},
});

export const { loginStart, loginSuccess, loginFailure, signupStart, signupSuccess, signupFailure } = authSlice.actions;

export const loginUser = (credentials) => async (dispatch) => {
	try {
		dispatch(loginStart());

		const headers = {
			Authorization: `Basic ${btoa(`${credentials.userID}:${credentials.password}`)}`,
		};

		const response = await fetch('http://localhost:80/api/authenticate', {
			method: 'GET',
			headers: headers,
		});

		if (!response.ok) {
			const data = await response.json();
			const errorMessage = data.Error;
			throw new Error(errorMessage);
		}

		const token = response.headers.get('Authorization').split(' ')[1];
		const user = jwt_decode(token);

		dispatch(loginSuccess({ user: user, accessToken: token }));
		dispatch(closeModal());
	} catch (error) {
		if (error === 'Error while creating User') {
			dispatch(closeModal());
		}
		dispatch(loginFailure(error.message));
	}
};

export const signupUser = (credentials) => async (dispatch) => {
	try {
		dispatch(signupStart());
		const response = await fetch('http://localhost:80/api/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(credentials),
		});

		if (!response.ok) {
			const data = await response.json();
			let errorMessage = data.Error;
			throw new Error(errorMessage);
		}

		const data = await response.json();
		dispatch(signupSuccess(data));
		dispatch(closeModal());
	} catch (error) {
		if (error === 'Error while creating User') {
			dispatch(closeModal());
		}
		dispatch(signupFailure(error.message));
	}
};

export default authSlice.reducer;
