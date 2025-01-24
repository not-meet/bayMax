// // types/index.ts
// interface FileDocument {
//   filename: string;
//   contentType: string;
//   data: Buffer;
//   uploadedAt: Date;
// }
//
// interface FileResponse {
//   _id: string;
//   filename: string;
//   contentType: string;
//   data: string; // Base64 encoded string
//   uploadedAt: Date;
// }
//
// // models/File.ts
// import mongoose, { Schema } from 'mongoose';
//
// const fileSchema = new Schema<FileDocument>({
//   filename: { type: String, required: true },
//   contentType: { type: String, required: true },
//   data: { type: Buffer, required: true },
//   uploadedAt: { type: Date, default: Date.now }
// });
//
// export default mongoose.models.File || mongoose.model<FileDocument>('File', fileSchema);
//
// // app/api/latest-pdf/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import dbConnect from '@/lib/dbConnect';
// import File from '@/models/File';
//
// export async function GET(request: NextRequest) {
//   try {
//     await dbConnect();
//
//     // Find the most recent PDF file
//     const latestFile = await File.findOne()
//       .sort({ uploadedAt: -1 }) // Sort by uploadedAt in descending order
//       .lean(); // Use lean() for better performance since we don't need the full mongoose document
//
//     if (!latestFile) {
//       return NextResponse.json(
//         { error: 'No PDF files found' },
//         { status: 404 }
//       );
//     }
//
//     // Convert Buffer to Base64 string for JSON response
//     const fileResponse: FileResponse = {
//       _id: latestFile._id.toString(),
//       filename: latestFile.filename,
//       contentType: latestFile.contentType,
//       data: latestFile.data.toString('base64'),
//       uploadedAt: latestFile.uploadedAt
//     };
//
//     return NextResponse.json(fileResponse, { status: 200 });
//   } catch (error) {
//     console.error('Error fetching latest PDF:', error);
//     return NextResponse.json(
//       { error: 'Error fetching latest PDF' },
//       { status: 500 }
//     );
//   }
// }
//
// // Optional: Add a download endpoint to handle the Base64 data
// // app/api/download-pdf/[id]/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import dbConnect from '@/lib/dbConnect';
// import File from '@/models/File';
//
// export async function GET(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await dbConnect();
//
//     const file = await File.findById(params.id);
//
//     if (!file) {
//       return NextResponse.json(
//         { error: 'PDF not found' },
//         { status: 404 }
//       );
//     }
//
//     // Create response with PDF file
//     const response = new NextResponse(file.data);
//
//     // Set appropriate headers
//     response.headers.set('Content-Type', file.contentType);
//     response.headers.set(
//       'Content-Disposition',
//       `attachment; filename="${file.filename}"`
//     );
//
//     return response;
//   } catch (error) {
//     console.error('Error downloading PDF:', error);
//     return NextResponse.json(
//       { error: 'Error downloading PDF' },
//       { status: 500 }
//     );
//   }
// }
