import { Photo } from "../../domain/entities/Photo";
import { PhotoRepository } from "../../domain/repositories/PhotoRepository";
import { Storage } from '@capacitor/storage';

const PHOTO_STORAGE_KEY = "photos";

export class LocalPhotoRepository implements PhotoRepository {
  async save(photo: Photo): Promise<void> {
    const photos = await this.getAll();
    photos.unshift(photo);  // Añadir la nueva foto al principio
    await Storage.set({
      key: PHOTO_STORAGE_KEY,
      value: JSON.stringify(photos),
    });
  }

  async getAll(): Promise<Photo[]> {
    const { value } = await Storage.get({ key: PHOTO_STORAGE_KEY });
    return value ? JSON.parse(value) : [];
  }
}
