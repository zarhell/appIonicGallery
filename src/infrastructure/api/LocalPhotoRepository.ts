import { Photo } from "../../domain/entities/Photo";
import { PhotoRepository } from "../../domain/repositories/PhotoRepository";
import { Preferences } from '@capacitor/preferences';


const PHOTO_STORAGE_KEY = "photos";

export class LocalPhotoRepository implements PhotoRepository {
  async save(photo: Photo): Promise<void> {
    const photos = await this.getAll();
    photos.unshift(photo);  // Añadir la nueva foto al principio
    await Preferences.set({
      key: 'myKey',
      value: 'myValue',
    });
  }

  async getAll(): Promise<Photo[]> {
    const { value } = await Preferences.get({ key: 'myKey' });
    return value ? JSON.parse(value) : [];
  }
}
