import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server";


export async function GET(request: Request) {
    try {
        revalidatePath('/otros/calendario');
        revalidatePath('');
        return NextResponse.json({revalidated: true})
      } catch (err) {
        return NextResponse.json({message:'Error revalidating'}, {status: 500});
      }
};