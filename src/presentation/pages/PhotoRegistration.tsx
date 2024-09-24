import React, { useState, useEffect } from 'react';
import { IonButton, IonContent, IonPage, IonTitle, IonToolbar, IonHeader, IonGrid, IonRow, IonCol, IonImg } from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import { takePhoto } from '../../application/services/PhotoService';
import { Photo } from '../../domain/entities/Photo';
import { LocalStorageService } from '../../application/services/LocalStorageService';

const PhotoRegistration: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const history = useHistory();
  const locationState = useLocation<{ patientId: string }>();

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    const savedPhotos = await LocalStorageService.getData(`photos_${locationState.state.patientId}`);
    if (savedPhotos) {
      setPhotos(savedPhotos);
    }
  };

  const handleTakePhoto = async () => {
    const newPhoto = await takePhoto();
    const updatedPhotos = [...photos, newPhoto];
    setPhotos(updatedPhotos);
    await LocalStorageService.saveData(`photos_${locationState.state.patientId}`, updatedPhotos);
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
