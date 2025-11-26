import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/authOptions"
import { LoginForm } from "@/components/auth/LoginForm"
import { Suspense } from "react"

const page = async () => {
    const session = await getServerSession(authOptions)

    if (session) {
        redirect("/")
    }

    return (
        <Suspense>
            <LoginForm />
        </Suspense>
    )
}

export default page
