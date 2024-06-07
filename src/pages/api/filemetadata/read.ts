import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/app/lib/mongodb";
import { FileMetadata } from "@/app/models/FileMetadata"


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
      const { owner } = req.query;

      if (!owner) {
        return res.status(400).json({ message: "Owner Address is required" });
      }

      const filesMetadata = await FileMetadata.find({ owner });

      if (!filesMetadata.length) {
        return res.status(404).json({ message: "No files found for this owner" });
      }

      res.status(200).json(filesMetadata);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}