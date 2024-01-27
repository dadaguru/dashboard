'use client'
//import "@uploadthing/react/styles.css";
import { UploadButton } from "@/utils/uploadthing";
import { useState } from "react";
import Image from "next/image";


function ImageUpload() {
  const [imageUrl, setImageUrl] = useState<string>('')
  return (
    <div>
      <UploadButton 
        endpoint='imageUploader' 
        onClientUploadComplete={(res) => {
          // Do something with the response
          setImageUrl(res[0].url);
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
      {imageUrl.length ? (
        <div>
          <Image src={imageUrl} alt='my image' width={500} height={500}/>
        </div> 
      ) : null}

      {imageUrl && (
        <button onClick={() => setImageUrl('')}>Change Image</button>
      )}
      
    </div>
  )
}

export default ImageUpload