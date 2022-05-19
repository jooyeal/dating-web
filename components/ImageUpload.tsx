import Image from "next/image";
import React, { ChangeEvent, useRef, useState } from "react";

interface Props {
  img: string;
  setImg: React.Dispatch<any>;
}

function ImageUpload({ img, setImg }: Props) {
  const [preview, setPreview] = useState<any>("");
  const ref = useRef<HTMLInputElement>(null);
  const onClick = () => {
    if (ref.current) ref.current.click();
  };

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImg(file);
    const base64 = await convertToBase64(file);
    setPreview(base64);
  };

  const convertToBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  return (
    <div
      className="w-96 h-96 flex items-center justify-center cursor-pointer border"
      onClick={onClick}
    >
      <input
        ref={ref}
        className="hidden"
        type="file"
        accept="image/*"
        onChange={onChange}
      />
      <div>
        {preview === "" && img === "" ? (
          <div>add image</div>
        ) : (
          <img
            src={preview !== "" ? preview : `http://localhost:5000/${img}`}
          />
        )}
      </div>
    </div>
  );
}

export default ImageUpload;
