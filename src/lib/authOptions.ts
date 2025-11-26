import { LoginClient } from "@/app/actions/auth/LoginClient"
import type { NextAuthOptions, SessionStrategy } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            // auth function that runs on submit
            // must return a user object or null
            async authorize(credentials) {
                if (!credentials) {
                    console.error("No credentials provided")
                    return null
                }
                // do database fetch to get/verify user exists
                // can just be a function call that handles auth in the actions folder
                try {
                    // the user object must have an "id" field.
                    const user = await LoginClient(
                        credentials.email,
                        credentials.password
                    )

                    return user
                } catch (error) {
                    console.error("Error calling backend login API:", error)
                    return null
                }
            },
        }),
    ],

    // these are functions called after any interaction with auth
    // i.e. (signin, getSession(), signUp)
    callbacks: {
        // typscript types are found in the extended next-auth types
        async jwt({ token, user }) {
            // The `user` object is only available on the first call after `authorize` succeeds
            if (user) {
                token.id = user.id
                token.role = user.role
                token.name = user.name
            }
            return token
        },
        async session({ session, token }) {
            // The `session` object is what's exposed to the client-side via useSession()
            // Add the data from the token to the session object
            session.user.id = token.id
            session.user.role = token.role
            session.user.name = token.name
            return session
        },
    },
    // specify that jwt will be used for session management
    session: {
        strategy: "jwt" as SessionStrategy,
        maxAge: 24 * 60 * 60, // 1 day long sessions
    },
    pages: {
        signIn: "/auth/signin", // Specify your custom login page path
    },
    secret: process.env.NEXTAUTH_SECRET,
}
