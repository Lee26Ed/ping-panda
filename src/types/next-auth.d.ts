import "next-auth"
import "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        user: User
        backendToken: string
    }

    interface User {
        id: number | string
        name: string
        role: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: number | string
        name: string
        role: string
    }
}
