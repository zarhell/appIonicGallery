import { Preferences } from '@capacitor/preferences';

export class LocalStorageService {
  
  static async saveData(key: string, data: any): Promise<void> {
    await Preferences.set({
      key: key,
      value: JSON.stringify(data),
    });
  }


  static async getData(key: string): Promise<any | null> {
    const { value } = await Preferences.get({ key: key });
    return value ? JSON.parse(value) : null;
  }


  static async removeData(key: string): Promise<void> {
    await Preferences.remove({ key: key });
  }


  static async clearStorage(): Promise<void> {
    await Preferences.clear();
  }
}
