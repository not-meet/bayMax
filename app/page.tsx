import FileUpload from '@/components/FileUploader';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-white sm:animate-gradient-bg sm:bg-gradient-to-r sm:from-[#f6f7ec] sm:to-[#e6e7dc] pt-24 flex flex-col items-center">
      <h1 className="text-3xl text-black font-bold text-center mb-4">
        Let's examine your reports!
      </h1>
      <Image src='/baymax.png' alt='baymax' height={250} width={250} />
      <div className="w-full max-w-lg mt-10">
        <FileUpload />
      </div>
    </main>
  );
}
