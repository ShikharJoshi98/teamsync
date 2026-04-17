import { cookies } from "next/headers";
import { verifyToken } from "./jwt";

export async function getUser() {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;

    if (!token) return null;

    const user = verifyToken(token);
    return user;
}