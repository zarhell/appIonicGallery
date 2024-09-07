import { Camera, CameraResultType, CameraSource, Photo as CameraPhoto } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Photo } from '../../domain/entities/Photo';

export async function takePhoto(): Promise<Photo> {
  const photo = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
    source: CameraSource.Camera,
    quality: 100,
  });

  const savedPhoto = await savePhoto(photo);
  return savedPhoto;
}

async function savePhoto(cameraPhoto: CameraPhoto): Promise<Photo> {
  const base64Data = await readAsBase64(cameraPhoto);

  const fileName = `${new Date().getTime()}.jpeg`;
  await Filesystem.writeFile({
    path: fileName,
    data: base64Data,
    directory: Directory.Data,
  });

  return {
    filepath: fileName,
    webviewPath: cameraPhoto.webPath,
  };
}

async function readAsBase64(photo: CameraPhoto): Promise<string> {
  const response = await fetch(photo.webPath!);
  const blob = await response.blob();
  return await convertBlobToBase64(blob);
}

function convertBlobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(blob);
  });
}
