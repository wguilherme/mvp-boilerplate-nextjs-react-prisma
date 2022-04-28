/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { title, description, email } = req.body
  await prisma.task.create({
    data: {
      isDone: false,
      title,
      description,
      email
    }
  })

}