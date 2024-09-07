import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';


export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}

export async function takePhoto(): Promise<UserPhoto> {
  
  const capturedPhoto = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
    source: CameraSource.Camera,
    quality: 100,
  });

  
  const savedFile = await savePicture(capturedPhoto);
  return savedFile;
}

async function savePicture(photo: Photo): Promise<UserPhoto> {
  const base64Data = await readAsBase64(photo);

  const fileName = new Date().getTime() + '.jpeg';
  const savedFile = await Filesystem.writeFile({
    path: fileName,
    data: base64Data,
    directory: Directory.Data,
  });

  return {
    filepath: fileName,
    webviewPath: photo.webPath,
  };
}

async function readAsBase64(photo: Photo): Promise<string> {
  // Obtener la imagen en formato blob
  const ImageResponse = await fetch(photo.webPath!);
  const imageBlob = await ImageResponse.blob();

  return await convertBlobToBase64(imageBlob) as string;
}

function convertBlobToBase64(blob: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
}