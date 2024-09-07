import React from 'react';
import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { camera } from 'ionicons/icons';

interface AddPhotoButtonProps {
  onClick: () => void;
}

const AddPhotoButton: React.FC<AddPhotoButtonProps> = ({ onClick }) => {
  return (
    <IonFab vertical="bottom" horizontal="center" slot="fixed">
      <IonFabButton onClick={onClick}>
        <IonIcon icon={camera} />
      </IonFabButton>
    </IonFab>
  );
};

export default AddPhotoButton;
