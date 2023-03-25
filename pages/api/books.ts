import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handle(req : NextApiRequest, res : NextApiResponse) {
    if (req.query.secret !== process.env.API_TOKEN) {
        return res.status(401).json({ message: 'Invalid token' })
    }
    try {
        const query = await prisma.libro.findMany();
        const results = query;
        res.status(200).json(results);}
    catch (error) {
        res.status(503).json( {message: error})
    }
}