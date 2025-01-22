import { NextRequest, NextResponse } from 'next/server';
import File from '../../../lib/models/index'
import { dbConnect } from '@/lib/dbConnect';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const newFile = await File.create({
      filename: file.name,
      contentType: file.type,
      data: buffer,
      uploadedAt: new Date()
    });

    return NextResponse.json(
      { message: 'File uploaded successfully', fileId: newFile._id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    );
  }
}
