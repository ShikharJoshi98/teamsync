import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });
        if (existingUser) {
            return Response.json(
                { success: false, error: "User already Exists" },
                { status: 400}
            )
        };
        const hashedPassword = await bcrypt.hash(password, 10);
        const User = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });
        return Response.json(
            { success: true, message: 'User created', User }
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