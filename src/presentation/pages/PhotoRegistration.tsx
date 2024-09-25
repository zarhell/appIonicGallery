import React, { useState, useEffect } from 'react';
import { IonButton, IonContent, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonImg, IonHeader } from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import { takePhoto } from '../../application/services/PhotoService';
import { Photo } from '../../domain/entities/Photo';
import { LocalPhotoRepository } from '../../infrastructure/api/LocalPhotoRepository';

const PhotoRegistration: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const photoRepository = new LocalPhotoRepository();
  const history = useHistory();
  const locationState = useLocation<{ patientId: string }>();

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    const savedPhotos = await photoRepository.getAll();
    if (savedPhotos) {
      setPhotos(savedPhotos);
    }
  };

  const handleTakePhoto = async () => {
    const newPhoto = await takePhoto();
    const updatedPhotos = [...photos, newPhoto];
    setPhotos(updatedPhotos);
    await photoRepository.save(newPhoto);
  };

  const handleConfirmPhotos = () => {
    history.push('/register-patient', { photos });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Registrar Fotos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
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

        <IonButton expand="block" onClick={handleConfirmPhotos}>
          Confirmar Fotos
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default PhotoRegistration;
