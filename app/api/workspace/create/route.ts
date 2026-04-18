import { getUser } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: Request) {
    try {
       const user: any = await getUser();
    if (!user) {
        return Response.json(
            { success: false, error: 'Unauthorized' },
            { status: 401 }
        );
    }
    const body = await req.json();
    const { name } = body;

    const workspace = await prisma.workspace.create({
        data: {
            name,
            owner: {
                connect: {
                    email: user.email
                }
            }
        }
    });

    return Response.json(
        { success: true, workspace, message: 'workspace created successfully' },
        { status: 201 }
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