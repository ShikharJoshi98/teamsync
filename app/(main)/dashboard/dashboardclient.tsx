"use client";

import { useEffect, useState } from "react";

export default function DashboardClient({ user }: any) {
    const [name, setName] = useState("");
    const [workspaces, setWorkspaces] = useState([]);

    const createWorkspace = async () => {
        await fetch("/api/workspace/create", {
            method: "POST",
            body: JSON.stringify({ name }),
        });

        fetchWorkspace();
    };

    const fetchWorkspace = async () => {
        const res = await fetch("/api/workspace/list");
        const data = await res.json();
        setWorkspaces(data?.workspaces);
    };

    useEffect(() => {
        fetchWorkspace();
    }, []);

    return (
        <div className="p-5">
            <h1>Dashboard</h1>
            <p>{user.email}</p>

            <input
                placeholder="Workspace Name"
                onChange={(e) => setName(e.target.value)}
            />

            <button onClick={createWorkspace} className="mb-10">
                Create Workspace
            </button>

            {workspaces.length > 0 && workspaces.map((ws: any) => (
                <div key={ws.id} className="mt-3">
                    {ws.name}
                </div>
            ))}
        </div>
    );
}
