import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import GeneralInfo from './form/GeneralInfo';
import TransferDetails from './form/TransferDetails';
import { FormData } from './form/types';
import ClinicalState from './form/ClinicalState';
import MedicalProcedures from './form/MedicalProcedures';
import { FirestoreService } from '../../application/services/FirestoreService';
import { LocalStorageService } from '../../application/services/LocalStorageService';
import { LocalPhotoRepository } from '../../infrastructure/api/LocalPhotoRepository';
import { takePhoto } from '../../application/services/PhotoService';
import { Photo } from '../../domain/entities/Photo';
import { IonButton, IonGrid, IonRow, IonCol, IonImg } from '@ionic/react';
const firestoreService = new FirestoreService();
const photoRepository = new LocalPhotoRepository();


const PatientDataForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    idNumber: "",
    age: "",
    gender: "",
    transferDate: "",
    originPlace: "",
    destinationPlace: "",
    heartRate: "",
    bloodPressure: "",
    temperature: "",
    ambulanceNumber: "",
    ambulanceType: "",
    transferReason: "",
    photos: [], 
  });

  const [step, setStep] = useState(0);
  const history = useHistory();
  const location = useLocation<any>();

  useEffect(() => {
    const loadFormData = async () => {
      const savedData = await LocalStorageService.getData("patientForm");
      if (savedData) {
        setFormData(savedData);
      }
    };
    loadFormData();
  }, []);
  
  useEffect(() => {
    if (location.state?.selectedLocation) {
      const { latitude, longitude } = location.state.selectedLocation;
      setFormData((prevFormData) => ({
        ...prevFormData,
        originPlace: `${latitude}, ${longitude}`,
      }));
    }
  }, [location.state]);

  const handleInputChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleTakePhoto = async () => {
    try {
      const newPhoto = await takePhoto();
      const savedPhoto = await photoRepository.save(newPhoto);
      setFormData({
        ...formData,
        photos: [...formData.photos, savedPhoto],
      });
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  };

  const handleSubmit = async () => {
    const patientId = formData.idNumber || 'default_id';
    await LocalStorageService.saveData("patientForm", formData);
    alert("Paciente registrado con éxito");
    history.push('/main');
  };

  const navigateToNext = () => setStep(step + 1);
  const navigateToPrev = () => setStep(step - 1);

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <>
            <GeneralInfo formData={formData} handleInputChange={handleInputChange} navigateToNext={navigateToNext} />
            <IonButton expand="block" onClick={handleTakePhoto}>
              Tomar Foto
            </IonButton>
            <IonGrid>
              <IonRow>
                {formData.photos.map((photo: Photo, index: number) => (
                  <IonCol size="6" key={index}>
                    <IonImg src={photo.webviewPath} />
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          </>
        );
      case 1:
        return <TransferDetails formData={formData} handleInputChange={handleInputChange} navigateToNext={navigateToNext} navigateToPrev={navigateToPrev} />;
      case 2:
        return <ClinicalState formData={formData} handleInputChange={handleInputChange} navigateToNext={navigateToNext} navigateToPrev={navigateToPrev} />;
      case 3:
        return <MedicalProcedures formData={formData} handleInputChange={handleInputChange} navigateToPrev={navigateToPrev} handleSubmit={handleSubmit} />;
      default:
        return <GeneralInfo formData={formData} handleInputChange={handleInputChange} navigateToNext={navigateToNext} />;
    }
  };

  return renderStep();
};

export default PatientDataForm;
