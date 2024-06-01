import React from "react";
import Image from "next/image";
import Dropzone, { FileWithPath } from "react-dropzone";
import { UploadS3File } from "@lib/services";

const ImageUploader = ({ handleImage, context }: any) => {
  const [files, setFiles] = React.useState<any>([]);

  const thumbs = files.map((file: any) => (
    <div className="border p-2" key={file.name}>
      <div className="flex w-auto h-36">
        <div className="relative w-36">
          <Image layout="fill" src={file.preview} alt="image" />
        </div>
      </div>
    </div>
  ));

  const [buttonLoader, setButtonLoader] = React.useState(false);

  const uploadFileToS3 = (file: FileWithPath) => {
    const formData = new FormData();
    formData.append("asset", file);
    formData.append("context", context);
    formData.append("attributes", "{}");
    setButtonLoader(true);

    UploadS3File(formData)
      .then((response) => {
        setButtonLoader(false);
        handleImage(response);
      })
      .catch((error) => {
        setButtonLoader(false);
        console.log(error);
      });
  };

  return (
    <>
      <Dropzone
        multiple={false}
        accept={{
          "image/png": [".png"],
          "image/jpeg": [".jpg", ".jpeg"],
        }}
        onDrop={(files: FileWithPath[]) => {
          uploadFileToS3(files[0]);
          setFiles(
            files.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            )
          );
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps({})}
            className="flex flex-col gap-2 p-20 border-dashed border-2 rounded"
          >
            <input {...getInputProps()} />
            <div className="m-auto font-medium">Upload your image</div>
            <div className="m-auto text-skin-muted text-sm">PNG & JPG are allowed</div>
            <div className="m-auto text-skin-base-dark pt-2 cursor-pointer">Browse photos</div>
          </div>
        )}
      </Dropzone>

      {thumbs && thumbs.length > 0 && (
        <>
          <div className="flex justify-between mt-2 mb-2 items-center">
            <div className="text-xl font-medium">Preview</div>
            {buttonLoader ? "Uploading in Progress." : "Uploaded"}
          </div>
          <div className="mt-3">{thumbs}</div>
        </>
      )}
    </>
  );
};

export default ImageUploader;
