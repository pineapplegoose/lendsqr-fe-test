import { Icon } from "@chakra-ui/react"

export const sideBarLinks = {
	home: [
		{
			name: "Dashboard",
			tag: "dashboard",
			icon: "/icons/home.svg",
		},
	],
	customers: [
		{
			name: "Users",
			icon: "/icons/user-1.svg",
			tag: "users",
		},
		{
			name: "Guarantors",
			icon: "/icons/users-2.svg",
			tag: "guarantors",
		},
	],
	businesses: [
		{
			name: "Organization",
			icon: "/icons/briefcase.svg",
			tag: "organization",
		},
		{
			name: "Loan Products",
			icon: "/icons/hand-sack.svg",
			tag: "loan-products",
		},
	],
	settings: [
		{
			name: "Preferences",
			icon: "/icons/sliders.svg",
			tag: "preferences",
		},
		{
			name: "Fees and Pricing",
			icon: "/icons/badge.svg",
			tag: "fees-and-pricing",
		},
	],
}
