"use client";

import { redirect } from "next/navigation";

export function LogoutButton() {
    const handleLogout = async () => {
        await fetch('/api/auth/logout', {
            method: "POST"
        });
        redirect("/login");
    }
    return <button onClick={handleLogout}>Logout</button>
}