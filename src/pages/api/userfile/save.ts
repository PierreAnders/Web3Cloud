
import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/app/lib/mongodb';
import UserFile from '@/app/models/UserFile';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
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

// import type { NextApiRequest, NextApiResponse } from 'next';
// import connectToDatabase from '@/app/lib/mongodb';
// import UserFile from '@/app/models/UserFile';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const client = await connectToDatabase();
//   const db = client.db();

//   if (req.method === 'POST') {
//     const { address, fileUris } = req.body;

//     try {
//       const newUserFile = new UserFile({
//         address,
//         fileUris,
//       });

//       await db.collection('userfiles').insertOne(newUserFile);
//       res.status(201).json({ message: 'Data saved successfully' });
//     } catch (error) {
//       res.status(500).json({ message: 'Server error', error });
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }