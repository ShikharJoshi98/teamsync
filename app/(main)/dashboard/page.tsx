import { getUser } from "@/app/lib/auth"
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const user = await getUser();
    console.log(user);
    if (!user) {
        redirect("/login");
    }
    return (
        <div className="p-5">
            Dashboard
        </div>
    )
}