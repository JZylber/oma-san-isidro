import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        revalidatePath('/oma/resultados');
        revalidatePath('/nandu/resultados');
        return NextResponse.json({revalidated: true})
      } catch (err) {
        return NextResponse.json({message:'Error revalidating'}, {status: 500});
      }
};
