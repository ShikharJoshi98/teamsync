import { users } from "@/app/lib/db";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) {
            return Response.json({
                success: false,
                error: "Invalid credentials"
            }, {
                status: 401
            });
        }
        return Response.json({
            success: true,
            message: "Logged in successfully"
        }, {
            status: 200
        });
    } catch (error) {
        return Response.json({
            success: false,
            error: error
        }, {
            status: 500
        });
    }    
}