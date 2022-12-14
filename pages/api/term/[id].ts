import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

// DELETE /api/term/:id
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const termId = req.query.id;

  const session = await getSession({ req });

  if (req.method === "DELETE") {
    if (session) {
      const term = await prisma.term.delete({
        where: { id: String(termId) },
      });
      res.json(term);
    } else {
      res.status(401).send({ message: "Unauthorized" });
    }
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
