import { AdminDashboard } from "@/components/admin/dashboard/AdminDashboard"
import { NavBar } from "@/components/layouts/NavBar"
import { authOptions } from "@/lib/authOptions"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

const page = async () => {
    // verify a session exists before rendering the admin dashboard
    const session = await getServerSession(authOptions)
    if (!session) {
        redirect("/auth/login")
    }

    if (session.user.role !== "Admin") {
        redirect("/forbidden")
    }

    return (
        <>
            <NavBar />
            <AdminDashboard />
        </>
    )
}

export default page
