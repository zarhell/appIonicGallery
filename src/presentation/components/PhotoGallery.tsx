import React from 'react';
import { IonGrid, IonRow, IonCol, IonImg } from '@ionic/react';
import { Photo } from '../../domain/entities/Photo';

interface PhotoGalleryProps {
  photos: Photo[];
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
  return (
    <IonGrid>
      <IonRow>
        {photos.map((photo, index) => (
          <IonCol size="6" key={index}>
            <IonImg src={photo.webviewPath} />
          </IonCol
        ))}
      </IonRow>
    </IonGrid>
  );
};

export default PhotoGallery;
