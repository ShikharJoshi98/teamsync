import { users } from "@/app/lib/db";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;

        const user = users.find(u => u.email === email);
        if (user) {
            return Response.json(
                {
                    error: 'User exists'
                },
                {
                    status: 400
                }
            );
        }
        users.push({ email, password });
        return Response.json(
            { success: true, message: 'User created' }
            , { status: 201 });
    } catch (error) {
        return Response.json({
            success: false,
            error: error
        }, {
            status: 500
        });
    }
}