
import { NextResponse } from 'next/server';
import { UTApi } from 'uploadthing/server';

const utapi = new UTApi();

const auth = (req: Request) => ({ id: "nextuser" }); // Fake auth function

export async function POST(req: Request) {
  const { imgKey } = await req.json();  
  const user = await auth(req);  
  if (!user) throw new Error("Unauthorized");
  try {
    const res = await utapi.deleteFiles(imgKey);
    console.log("res in utapi delete :", res);
    return NextResponse.json(res);
  } catch (error) {
    console.log("error in deleting image from uploadthing :", error);
    return new NextResponse("Internal server error uploadthing/delete", { status: 500 })
  }
}

