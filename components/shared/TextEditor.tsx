"use client";

import customAxios from "@/configs/customAxios";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "next-themes";

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

function TextEditor({ value, onChange }: TextEditorProps) {
  const { resolvedTheme } = useTheme();

  const handleUploadImage = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    blobInfo: any,
    progress?: (percent: number) => void
  ): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      try {
        const formData = new FormData();
        formData.append("file", blobInfo.blob(), blobInfo.filename());
        formData.append("title", `${Date.now()}-${blobInfo.filename()}`);
        formData.append("isPublished", JSON.stringify(true));

        const { data } = await customAxios.post("admin/file-upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (e) => {
            if (progress && e.total) {
              progress((e.loaded / e.total) * 100);
            }
          },
        });

        if (data?.data?.file) {
          resolve(data.data.file);
        } else {
          reject("Image upload failed, no file returned");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        reject("Image upload failed");
      }
    });
  };

  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
      value={value}
      onEditorChange={(newValue) => {
        onChange(newValue);
      }}
      init={{
        height: 500,
        plugins: [
          "advlist",
          "autolink",
          "link",
          "image",
          "lists",
          "charmap",
          "preview",
          "anchor",
          "pagebreak",
          "searchreplace",
          "wordcount",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "emoticons",
          "help",
        ],
        toolbar:
          "undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | " +
          "bullist numlist outdent indent | link image | print preview media fullscreen | " +
          "forecolor backcolor emoticons | help",
        menu: {
          favs: {
            title: "My Favorites",
            items: "code visualaid | searchreplace | emoticons",
          },
        },
        menubar: "favs file edit view insert format tools table help",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        images_upload_url:
          process.env.NEXT_PUBLIC_SERVER_URL + "uploads/files/",
        automatic_uploads: true,
        images_reuse_filename: true,
        images_upload_handler: handleUploadImage,
        skin: resolvedTheme === "light" ? "oxide" : "oxide-dark",
        content_css: resolvedTheme === "light" ? "default" : "dark",
      }}
    />
  );
}

export default TextEditor;
