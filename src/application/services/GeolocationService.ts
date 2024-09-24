import { Geolocation } from '@capacitor/geolocation';

export interface Location {
  latitude: number;
  longitude: number;
}

export class GeolocationService {
  static async getCurrentLocation(): Promise<Location | null> {
    try {
      const position = await Geolocation.getCurrentPosition();
      return {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
    } catch (error) {
      console.error('Error getting location from GPS:', error);
      return null;
    }
  }
}
