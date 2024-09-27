export interface FormData {
    photos: any;
    fullName: string;
    idNumber: string;
    age: string;
    gender: string;
    transferDate: string;
    originPlace: string;
    destinationPlace: string;
    heartRate: string;
    bloodPressure: string;
    temperature: string;
    ambulanceNumber: string;
    ambulanceType: string;
    transferReason: string;
  }
  
  export interface LocationState {
    selectedLocation?: {
      latitude: number;
      longitude: number;
    };
  }
  
  export interface FormProps {
    formData: FormData;
    handleInputChange: (e: any) => void;
    navigateToNext?: () => void;
    navigateToPrev?: () => void;
    handleSubmit?: () => void;
  }
  