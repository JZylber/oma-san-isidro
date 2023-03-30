import { NextApiRequest, NextApiResponse } from "next";
import { TestQueryResults } from "../../components/ResultsPage/resultsTypes";

export default async function handle(req : NextApiRequest, res : NextApiResponse) {
    if (req.query.secret !== process.env.API_TOKEN) {
        return res.status(401).json({ message: 'Invalid token' })
    }
    try{
        const fs = require("fs");
        const {fileFormat,results}:{fileFormat : string , results : TestQueryResults[] }= req.body;
        res.status(200).json({message:`${fileFormat} ${results.length}`});
    }
    catch (error) {
        res.status(500).json( {message: {error}})
    }
}