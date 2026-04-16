import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;
       
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return Response.json(
                { success: false, message: 'Invalid credentials' },
                { status: 400 }
            );
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return Response.json(
                { success: false, message: 'Invalid credentials' },
                { status: 400 }
            );
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