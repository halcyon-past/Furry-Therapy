"use client";

import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Image src="https://utfs.io/f/h4iMvyaAF7G4JZsXyshZygrfGC7vuxOc2T9dSUwYV1jWlLao" alt="home" fill={true} className="object-cover opacity-70" />
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
            const fileUrl = res[0].url;
            console.log("Files: ", res);
            console.log("File URL: ", fileUrl);
            alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}
