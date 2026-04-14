'use client';
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        console.log(data);
    }

    return (
        <div className="p-5">
            <h1 className="mb-2">Login</h1>
            <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSubmit}>Login</button>
        </div>
    )
}