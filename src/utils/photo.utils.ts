import { Exif } from "@/models/photoSpot.model";
import { Photo } from "@capacitor/camera";
import { Filesystem } from "@capacitor/filesystem";

import ExifReader from "exifreader";
import { convertExifToTimeStamp } from "./date.utils";
import { Timestamp } from "firebase/firestore";

const MAX_WIDTH = 800;
const MAX_HEIGHT = 800;
const MIME_TYPE = "image/jpeg";
const QUALITY = 0.9;

export async function getExifPhoto(file: File): Promise<Exif> {
  const tags = await ExifReader.load(file);

  const stamp = tags.DateTimeOriginal
    ? convertExifToTimeStamp(tags.DateTimeOriginal.description)
    : undefined;

  const exif: Exif = {
    ExposureTime: tags.ExposureTime?.description ?? "",
    Flash: tags.Flash?.description ?? "",
    FocalLength: tags.FocalLength?.description ?? "",
    ISOSpeedRatings: tags.ISOSpeedRatings?.description ?? "",
    LensModel: tags.LensModel?.description ?? "",
    Make: tags.Make?.description ?? "",
    Model: tags.Model?.description ?? "",
    Software: tags.Software?.description ?? "",
  };

  if (stamp) {
    exif.DateTimeOriginal = stamp;
  }

  return exif;
}

export function calculateSize(img: any, maxWidth: number, maxHeight: number) {
  let width = img.width;
  let height = img.height;

  // calculate the width and height, constraining the proportions
  if (width > height) {
    if (width > maxWidth) {
      height = Math.round((height * maxWidth) / width);
      width = maxWidth;
    }
  } else {
    if (height > maxHeight) {
      width = Math.round((width * maxHeight) / height);
      height = maxHeight;
    }
  }
  return [width, height];
}

export function b64toBlob(b64Data: string, contentType = "", sliceSize = 512) {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

export async function getBlob(photo: Photo): Promise<Blob> {
  const response = await fetch(photo.webPath!);
  return await response.blob();
}

export async function getBase64(photo: Photo): Promise<string> {
  const file = await Filesystem.readFile({
    path: photo.path!,
  });
  return file.data as string;
}

export function getPreview(file: File): Promise<Blob | null> {
  const blobUrl = URL.createObjectURL(file);
  const img = new Image();
  img.src = blobUrl;

  // Compress image
  return new Promise((resolve) => {
    img.onload = async () => {
      const [newWidth, newHeight] = calculateSize(img, MAX_WIDTH, MAX_HEIGHT);
      const canvas = document.createElement("canvas");
      canvas.width = newWidth;
      canvas.height = newHeight;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
      }

      await canvas.toBlob(
        (blob) => {
          // assign the compressed image
          resolve(blob);
        },
        MIME_TYPE,
        QUALITY
      );
    };
  });
}
