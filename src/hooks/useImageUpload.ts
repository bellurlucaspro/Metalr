import { useState } from "react";
import { supabase } from "../lib/supabase";

export function useImageUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (
    file: File,
    folder: string = "general"
  ): Promise<string | null> => {
    setUploading(true);
    setError(null);

    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;
    const filePath = `${folder}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("media")
      .upload(filePath, file);

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return null;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("media").getPublicUrl(filePath);

    setUploading(false);
    return publicUrl;
  };

  const deleteImage = async (url: string): Promise<boolean> => {
    const path = url.split("/storage/v1/object/public/media/")[1];
    if (!path) return false;
    const { error: err } = await supabase.storage.from("media").remove([path]);
    return !err;
  };

  return { upload, deleteImage, uploading, error };
}
