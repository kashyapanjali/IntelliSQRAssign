// src/api/auth.ts
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/auth";

export const login = async (data: { email: string; password: string }) => {
	const response = await axios.post(`${BASE_URL}/login`, data);
	return response.data;
};

export const signup = async (data: { email: string; password: string }) => {
	const response = await axios.post(`${BASE_URL}/signup`, data);
	return response.data;
};
