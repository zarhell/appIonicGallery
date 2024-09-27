export interface Location {
    latitude: number;
    longitude: number;
  }
  
  export interface IReverseGeocodeService {
    getAddressFromCoordinates(latitude: number, longitude: number): Promise<string | null>;
  }
  
  export class ReverseGeocodeService implements IReverseGeocodeService {
    async getAddressFromCoordinates(latitude: number, longitude: number): Promise<string | null> {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
  
        if (!response.ok) {
          throw new Error('Error al obtener la dirección');
        }
  
        const data = await response.json();
        return data.display_name || 'No se encontró dirección';
      } catch (error) {
        console.error('Error al obtener la dirección', error);
        return null;
      }
    }
  }
  