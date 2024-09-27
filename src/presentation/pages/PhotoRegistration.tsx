import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonGrid, IonRow, IonCol, IonImg, IonBackButton, IonButtons } from '@ionic/react';
import { takePhoto } from '../../application/services/PhotoService';
import { LocalPhotoRepository } from '../../infrastructure/api/LocalPhotoRepository';
import { useHistory } from 'react-router-dom';
import { LocalStorageService } from '../../application/services/LocalStorageService';

const PhotoRegistration: React.FC = () => {
  const [photos, setPhotos] = useState<any[]>([]);
  const history = useHistory();
  const photoRepository = new LocalPhotoRepository();

  useEffect(() => {
    const loadPhotos = async () => {
      const savedData = await LocalStorageService.getData('patientForm');
      if (savedData) {
        setPhotos(savedData.photos || []);
      }
    };
    loadPhotos();
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

  const handleNext = async () => {
    const formData = await LocalStorageService.getData('patientForm');
    await LocalStorageService.saveData('patientForm', { ...formData, photos });
    history.push('/location');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/patient-data" />
          </IonButtons>
          <IonTitle>Registro Fotográfico</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton expand="block" onClick={handleTakePhoto}>Tomar Foto</IonButton>
        <IonGrid>
          <IonRow>
            {photos.map((photo, index) => (
              <IonCol size="6" key={index}>
                <IonImg src={photo.webviewPath} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        <IonButton expand="block" onClick={handleNext}>Siguiente</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default PhotoRegistration;
