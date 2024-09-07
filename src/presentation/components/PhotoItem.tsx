import React from 'react';
import { IonImg } from '@ionic/react';
import { Photo } from '../../domain/entities/Photo';

interface PhotoItemProps {
  photo: Photo;
}

const PhotoItem: React.FC<PhotoItemProps> = ({ photo }) => {
  return <IonImg src={photo.webviewPath} />;
};

export default PhotoItem;
