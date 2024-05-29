import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/app/lib/mongodb';
import UserFile from '@/app/models/UserFile';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === 'POST') {
    const { address, fileUris } = req.body;

    try {
      const newUserFile = new UserFile({
        address,
        fileUris,
      });

      await newUserFile.save();
      res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}