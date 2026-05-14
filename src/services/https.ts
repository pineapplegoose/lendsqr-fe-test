import axios from "axios"
import {
	getUserToken,
	getRefreshToken,
	storeUserToken,
	clearAuthTokens,
} from "./cookies"

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	timeout: 10_000,
})

axiosInstance.interceptors.request.use(
	(config) => {
		const accessToken = getUserToken()

		if (accessToken) {
			config.headers.Authorization = accessToken.startsWith("Bearer ")
				? accessToken
				: `Bearer ${accessToken}`
		}

		return config
	},
	(error) => Promise.reject(error),
)

let isRefreshing = false

axiosInstance.interceptors.response.use(
	(response) => response,

	async (error) => {
		const originalRequest = error.config

		// access token expired
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true

			try {
				// prevent multiple refresh calls
				if (!isRefreshing) {
					isRefreshing = true

					const refreshToken = getRefreshToken()

					// example refresh request
					const response = await axios.post(
						`${import.meta.env.VITE_API_BASE_URL}/auth/refresh-token`,
						{
							refreshToken,
						},
					)

					const newAccessToken = response.data.accessToken

					storeUserToken(newAccessToken)

					axiosInstance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`

					isRefreshing = false
				}

				return axiosInstance(originalRequest)
			} catch (refreshError) {
				isRefreshing = false

				clearAuthTokens()

				window.location.href = "/"

				return Promise.reject(refreshError)
			}
		}

		// timeout/network handling
		if (error.code === "ECONNABORTED") {
			console.error("Request timeout")
		}

		if (!error.response) {
			console.error("Network error")
		}

		return Promise.reject(error)
	},
)

export const setAuthTokenHeader = (accessToken: string) => {
	axiosInstance.defaults.headers.common.Authorization = accessToken.startsWith(
		"Bearer ",
	)
		? accessToken
		: `Bearer ${accessToken}`
}

const http = {
	post: axiosInstance.post,
	get: axiosInstance.get,
	patch: axiosInstance.patch,
	put: axiosInstance.put,
	delete: axiosInstance.delete,
}

export default http
