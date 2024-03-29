import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server";


export async function GET(request: Request) {
    try {
        revalidatePath('/(public)/oma/instancias');
        revalidatePath('/(public)/nandu/instancias');
        return NextResponse.json({revalidated: true})
      } catch (err) {
        return NextResponse.json({message:'Error revalidating'}, {status: 500});
      }
};