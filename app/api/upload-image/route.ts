import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('image');

    if (!file || typeof file === 'string') {
      return NextResponse.json({ message: 'No file uploaded or invalid data' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadDir = path.join(process.cwd(), '.uploads'); // Hidden folder

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({
      message: 'Image uploaded successfully',
      file: {
        name: file.name,
        size: buffer.length,
        url: `api/uploads/${fileName}`, 
      },
    });
  } catch (error) {
    console.error('Error while uploading file:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
