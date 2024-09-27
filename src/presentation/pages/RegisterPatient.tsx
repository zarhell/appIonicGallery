import React, { useState, useEffect } from 'react';
import { IonButton, IonContent, IonInput, IonPage, IonTitle, IonToolbar, IonHeader, IonItem, IonLabel, IonImg, IonGrid, IonRow, IonCol, IonButtons, IonBackButton } from '@ionic/react';
import { LocalPhotoRepository } from '../../infrastructure/api/LocalPhotoRepository';
import { Photo } from '../../domain/entities/Photo';
import { LocalStorageService } from '../../application/services/LocalStorageService';
import { takePhoto } from '../../application/services/PhotoService';

interface RegisterPatientProps {
  photoRepository: LocalPhotoRepository;
}

const RegisterPatient: React.FC<RegisterPatientProps> = ({ photoRepository }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const loadFormData = async () => {
      const savedData = await LocalStorageService.getData('patientForm');
      if (savedData) {
        setName(savedData.name || '');
        setAge(savedData.age || '');
        setPhotos(savedData.photos || []);
      }
    };
    loadFormData();
  }, []);

  const handleTakePhoto = async () => {
    try {
      const newPhoto = await takePhoto();
      const savedPhoto = await photoRepository.save(newPhoto);
      setPhotos([...photos, savedPhoto]);
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  };
  
  const handleSubmit = async () => {
    const formData = {
      name,
      age,
      photos,
    };
    await LocalStorageService.saveData('patientForm', formData);
    alert('Paciente guardado exitosamente');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/main" />
          </IonButtons>
          <IonTitle>Registrar Paciente</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel position="floating">Nombre Completo</IonLabel>
          <IonInput 
            value={formData.fullName} 
            onIonChange={(e: CustomEvent) => setFormData({ ...formData, fullName: e.detail.value! })} 
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Número de ID</IonLabel>
          <IonInput 
            value={formData.idNumber} 
            onIonChange={(e: CustomEvent) => setFormData({ ...formData, idNumber: e.detail.value! })} 
          />
        </IonItem>

        <IonButton expand="block" onClick={handleTakePhoto}>
          Tomar Foto
        </IonButton>

        <IonGrid>
          <IonRow>
            {photos.map((photo, index) => (
              <IonCol size="6" key={index}>
                <IonImg src={photo.webviewPath} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        
        <IonButton expand="block" onClick={handleSubmit}>
          Enviar Registro
        </IonButton>
        
      </IonContent>
    </IonPage>
  );
};

export default RegisterPatient;
