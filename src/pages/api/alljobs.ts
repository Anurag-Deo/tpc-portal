// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToSql, disconnect } from "../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Object>
) {
    try {
        const connection = connectToSql();
        // run query and return response
        disconnect(connection);
    } catch (error) {
        res.json({ error: error });
    }
}
