// src/pages/api/filemetadata/save.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { FileMetadata } from '@/app/models/FileMetadata';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const fileMetadata = new FileMetadata(req.body);
      await fileMetadata.save();
      res.status(201).json(fileMetadata);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}