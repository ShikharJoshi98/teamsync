export async function POST(req:Request) {
    const response = Response.json({ message: "Logged out successfully" });
    response.headers.set(
        "Set-Cookie",
        "token=; HttpOnly; Path=/; Max-Age=0"
    );
    return response;
}