import { users } from "@/app/lib/db";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;
        await prisma.user.create({
            data: {
                email: "test@test.com",
                password: "123456",
            },
        });
        // const user = users.find(u => u.email === email);
        // if (user) {
        //     return Response.json(
        //         {
        //             error: 'User exists'
        //         },
        //         {
        //             status: 400
        //         }
        //     );
        // }
        // users.push({ email, password });
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