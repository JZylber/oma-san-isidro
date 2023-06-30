import { NextApiRequest, NextApiResponse } from "next"

export default async function handle(req : NextApiRequest, res : NextApiResponse) {
    let {instanceData} = req.query
    instanceData = instanceData as string[]
    const [competition,instance] = instanceData;
    res.status(200).json(`${competition} ${instance}`);
  }