import FileUpload from '@/components/FileUploader';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-white sm:bg-[#f6f7ec] pt-24 flex flex-col items-center">
      {/* Title with Typewriter Animation */}
      <h1 className="text-3xl text-black font-bold text-center mb-4">
        Let's examine your reports!
      </h1>

      {/* Image */}
      <Image src='/baymax.png' alt='baymax' height={250} width={250} />

      {/* FileUpload Component */}
      <div className="w-full max-w-lg">
        <FileUpload />
      </div>
    </main>
  );
}
