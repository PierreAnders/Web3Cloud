import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/app/lib/mongodb";
import FileMetadata from "@/app/models/FileMetadata";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  await connectToDatabase();

  if (req.method === "POST") {
    const { name, uri, category, isPrivate, owner  } = req.body;

    try {
      const newFileMetadata = new FileMetadata({
        name,
        uri,
        category,
        isPrivate,
        owner
      });

      await newFileMetadata.save();
      res.status(201).json({ message: "Data saved successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
