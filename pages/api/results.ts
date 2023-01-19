import prisma from "../../lib/prisma"

export default async function handle(req, res) {
    const result = await prisma.colegio.findUnique(   
        {
            where : {
                id_colegio : 1,
            },
        })
    res.json(result);
}