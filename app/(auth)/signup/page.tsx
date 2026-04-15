'use client';
import { prisma } from "@/app/lib/prisma";
import { useState } from "react"

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {

        const res = await fetch("/api/auth/signup", {
            method: "POST",
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        console.log(data);
    }

    return (
        <div className="p-5">
            <h1 className="mb-2">Sign Up</h1>
            <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSubmit}>Sign Up</button>
        </div>
    )
}