import http from "./https"
import _ from "lodash"

interface LoginPayload {
	email: string
	password: string
	rememberMe?: boolean
}
export interface UserColumns {
	organization: string
	username: string
	email: string
	phone: string
	dateJoined: string
	status: string
	password: string
}

const REMEMBER_ME_KEY = "remember_user"

export const saveCredentials = (email: string, password: string) => {
	localStorage.setItem(
		REMEMBER_ME_KEY,
		JSON.stringify({ email, password, timestamp: Date.now() }),
	)
}

export const getStoredCredentials = () => {
	const stored = localStorage.getItem(REMEMBER_ME_KEY)
	if (!stored) return null

	const parsed = JSON.parse(stored)
	const { timestamp } = parsed

	// check if timestamp exists and is within 30 days
	const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000
	if (timestamp && Date.now() - timestamp < thirtyDaysInMs) {
		return parsed
	}

	clearStoredCredentials()
	return null
}

export const clearStoredCredentials = () => {
	localStorage.removeItem(REMEMBER_ME_KEY)
}
export const loginUser = async (payload: LoginPayload) => {
	const res = await http.get<UserColumns[]>("/users")

	const users = res.data

	const user = users.find(
		(u) => u.email === payload.email && u.password === payload.password,
	)

	if (!user) {
		throw new Error("Invalid credentials")
	}

	return user
}
