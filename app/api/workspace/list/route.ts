import { getUser } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
    try {
        const user:any = await getUser();
        if (!user) {
            return Response.json(
                { success: false, message: 'Unauthorized Access' },
                { status: 401 }
            );
        }
        const workspaces = await prisma.workspace.findMany({
            where: {
                owner: {
                    email: user.email
                }
            }
        });
        return Response.json(
            { success: true, workspaces },
            { status: 200 }
        );
    } catch (error) {
        return Response.json({
            success: false,
            error: error
        }, {
            status: 500
        });
    }
}