"use server"

import { BadRequestError } from "@/lib/errors"

export const LoginClient = async (
    email: string,
    password: string
): Promise<User> => {
    if (!email || !password) {
        throw new BadRequestError("Email and password are required")
    }

    try {
        await new Promise((resolve) => setTimeout(resolve, 300)) // simulate network delay
        // verify the user exists
        const user = users.find((u) => u.email === email)
        if (!user) {
            throw new BadRequestError("Invalid credentials")
        }

        // verify the password matches
        const isPasswordValid = user.password === password
        if (!isPasswordValid) {
            throw new BadRequestError("Invalid credentials")
        }

        return user
    } catch (error) {
        throw error
    }
}

const users = [
    {
        id: "12345",
        email: "lee.14.panti@gmail.com",
        password: "one2enter",
        role: "Admin",
        name: "Lee Panti",
    },
    {
        id: "67890",
        email: "jordani_a@yahoo.com",
        password: "one2enter",
        role: "Admin",
        name: "Jordan Alpuche",
    },
    {
        id: "54321",
        email: "alex@gmail.com",
        password: "one2enter",
        role: "User",
        name: "Alex Johnson",
    },
]
