import { AdminDashboard } from "@/components/admin/dashboard/AdminDashboard"
import { UserDashboard } from "@/components/user/dashboard/UserDashboard"
import { NavBar } from "@/components/layouts/NavBar"
import { authOptions } from "@/lib/authOptions"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

// Define a type for the session user to ensure TypeScript knows about the 'role'
// (Assuming your NextAuth configuration extends the default Session and User types)
interface CustomSession {
    user?: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
        role?: "Admin" | "User" | "Guest"; // Add other roles if applicable
    };
    expires: string;
}

const page = async () => {
    // 1. Fetch the session
    const session = await getServerSession(authOptions) as CustomSession;

    // 2. Handle no session (not logged in)
    if (!session || !session.user) {
        redirect("/auth/login")
    }

    // 3. Conditional rendering based on user role
    const userRole = session.user.role;

    // Check if the user is an Admin
    if (userRole === "Admin") {
        return (
            <>
                {/* Assuming NavBar is part of the layout for both roles */}
                <NavBar /> 
                <AdminDashboard />
            </>
        )
    } 
    
    // Check if the user is a standard User (or any other non-admin role)
    if (userRole === "User" || !userRole) { // Default to User if role is undefined/missing but session exists
        return (
            <>
                <NavBar />
                <UserDashboard />
            </>
        )
    }

    // If the role is explicitly recognized but not handled (e.g., "Guest")
    // or if you want to explicitly forbid unrecognized roles.
    // Since your old logic redirected non-admins, we'll keep a fallback redirect here.
    redirect("/forbidden")
}

export default page
