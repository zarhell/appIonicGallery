import { Photo } from "../../domain/entities/Photo";
import { PhotoRepository } from "../../domain/repositories/PhotoRepository";
import { Preferences } from '@capacitor/preferences';


export class LocalPhotoRepository implements PhotoRepository {
  async save(photo: Photo): Promise<void> {
    const photos = await this.getAll();
    photos.unshift(photo); 
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
