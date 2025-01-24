import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import File from '../../../lib/models/index'
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const latestFile = await File.findOne()
      .sort({ uploadedAt: -1 }) // Sort by creation date in descending order
      .exec(); // Execute the query

    if (!latestFile) {
      return NextResponse.json(
        { error: 'No PDF files found' },
        { status: 404 }
      );
    }

    const response = new NextResponse(latestFile.data);

    response.headers.set('Content-Type', latestFile.contentType);
    response.headers.set(
      'Content-Disposition',
      `attachment; filename="${latestFile.filename}"`
    );

    return response;
  } catch (error) {
    console.error('Error downloading the latest PDF:', error);
    return NextResponse.json(
      { error: 'Error downloading the latest PDF' },
      { status: 500 }
    );
  }
}
