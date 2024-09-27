export interface Patient {
    id: string;
    fullName: string;
    idNumber: string;
    age: string;
    gender: string;
    location: { latitude: number; longitude: number } | null;
    photos: string[];
  }
  