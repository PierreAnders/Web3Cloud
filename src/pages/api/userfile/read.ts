import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/app/lib/mongodb";
import UserFile from "@/app/models/UserFile";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  await connectToDatabase();

  if (req.method === "GET") {
    try {
      const { address } = req.query;

      if (!address) {
        return res.status(400).json({ message: "Address is required" });
      }

      const userFiles = await UserFile.find({ address });

      if (!userFiles.length) {
        return res.status(404).json({ message: "No files found for this address" });
      }

      res.status(200).json(userFiles);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}