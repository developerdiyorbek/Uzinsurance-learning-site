"use client";

import { Button } from "@/components/ui/button";
import { useFileUpload } from "@/hooks/use-file-upload";
import { CircleUserRoundIcon } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

interface ImageUploadInputProps {
  initialImage?: string | null;
  onChange?: (file: File | null) => void;
}

export default function ImageUploadInput({
  initialImage = null,
  onChange,
}: ImageUploadInputProps) {
  const [{ files }, { removeFile, openFileDialog, getInputProps }] =
    useFileUpload({
      accept: "image/*",
    });

  const currentFile = files[0]?.file as File | undefined;
  const previewUrl = files[0]?.preview || initialImage || null;
  const fileName = currentFile?.name || null;

  useEffect(() => {
    if (onChange) {
      onChange(currentFile ?? null);
    }
  }, [currentFile, onChange]);

  const handleRemove = () => {
    if (files[0]?.id) removeFile(files[0].id);
    if (onChange) onChange(null);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="inline-flex items-center gap-2 align-top">
        <div
          className="border-input relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md border"
          aria-label={
            previewUrl ? "Preview of uploaded image" : "Default user avatar"
          }
        >
          {previewUrl ? (
            <Image
              className="size-full object-cover"
              src={previewUrl}
              alt="Preview of uploaded image"
              width={32}
              height={32}
            />
          ) : (
            <div aria-hidden="true">
              <CircleUserRoundIcon className="opacity-60" size={16} />
            </div>
          )}
        </div>

        <div className="relative inline-block">
          <Button onClick={openFileDialog} aria-haspopup="dialog" type="button">
            {fileName ? "Change image" : "Upload image"}
          </Button>
          <input
            {...getInputProps()}
            className="sr-only"
            aria-label="Upload image file"
            tabIndex={-1}
          />
        </div>
      </div>

      <div className="inline-flex gap-2 text-xs">
        {fileName || previewUrl ? (
          <>
            <p className="text-muted-foreground truncate" aria-live="polite">
              {fileName || "Existing image"}
            </p>
            <button
              onClick={handleRemove}
              className="cursor-pointer text-destructive font-medium hover:underline"
              aria-label={`Remove ${fileName || "image"}`}
              type="button"
            >
              Remove
            </button>
          </>
        ) : (
          <p className="text-muted-foreground truncate" aria-live="polite">
            No image attached
          </p>
        )}
      </div>
    </div>
  );
}
