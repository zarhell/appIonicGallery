import { Photo } from "../../domain/entities/Photo";
import { PhotoRepository } from "../../domain/repositories/PhotoRepository";
import { Preferences } from '@capacitor/preferences';


const PHOTO_STORAGE_KEY = "photos";

export class LocalPhotoRepository implements PhotoRepository {
  async save(photo: Photo): Promise<Photo> {
    const photos = await this.getAll();
    photos.unshift(photo);
    await Preferences.set({
      key: PHOTO_STORAGE_KEY,
      value: JSON.stringify(photos),
    });
    return photo;
  }

  async getAll(): Promise<Photo[]> {
    const { value } = await Preferences.get({ key: PHOTO_STORAGE_KEY });
    return value ? JSON.parse(value) : [];
  }
}
