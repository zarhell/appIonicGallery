import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonModal, IonDatetime, IonInput, IonSelect, IonSelectOption } from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import { FormProps, LocationState } from './types';
import { ReverseGeocodeService } from '../../../application/services/ReverseGeocodeService';

const TransferDetails: React.FC<FormProps> = ({ formData, handleInputChange, navigateToNext, navigateToPrev }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [originAddress, setOriginAddress] = useState<string | null>(formData.originPlace);
  const [destinationAddress, setDestinationAddress] = useState<string | null>(formData.destinationPlace);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [loadingAddress, setLoadingAddress] = useState<boolean>(false);

  const history = useHistory();
  const locationState = useLocation<LocationState>();

  useEffect(() => {
    if (locationState.state?.selectedLocation) {
      const { latitude, longitude } = locationState.state.selectedLocation;
      setLatitude(latitude);
      setLongitude(longitude);
    }
  }, [locationState]);

  useEffect(() => {
    const fetchAddress = async () => {
      if (latitude && longitude && !loadingAddress) {
        setLoadingAddress(true); // Para evitar múltiples llamadas
        const reverseGeocodeService = new ReverseGeocodeService();
        const foundAddress = await reverseGeocodeService.getAddressFromCoordinates(latitude, longitude);
        const urlParams = new URLSearchParams(window.location.search);
        const type = urlParams.get('type');

        if (type === 'origin') {
        setOriginAddress(foundAddress);
          handleInputChange({ target: { name: 'originPlace', value: foundAddress } });
        } else if (type === 'destination') {
          setDestinationAddress(foundAddress);
          handleInputChange({ target: { name: 'destinationPlace', value: foundAddress } });
        }

        setLoadingAddress(false);
      }
    };
    fetchAddress();
  }, [latitude, longitude, handleInputChange, loadingAddress]);

  const handleOpenMapForOrigin = () => {
    history.push("/map?type=origin");
  };

  const handleOpenMapForDestination = () => {
    history.push("/map?type=destination");
  };

  const handleDateChange = (e: any) => {
    const selectedDate = e.detail.value;
    handleInputChange({ target: { name: "transferDate", value: selectedDate } });
    setShowCalendar(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Detalles del Traslado</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel>Fecha del Traslado</IonLabel>
          <IonButton expand="block" onClick={() => setShowCalendar(true)}>
            {formData.transferDate ? formData.transferDate : "Seleccionar Fecha"}
          </IonButton>
        </IonItem>

        <IonModal isOpen={showCalendar} onDidDismiss={() => setShowCalendar(false)}>
          <IonContent>
            <IonDatetime presentation="date" value={formData.transferDate} onIonChange={handleDateChange} showDefaultButtons />
            <IonButton onClick={() => setShowCalendar(false)}>Cerrar</IonButton>
          </IonContent>
        </IonModal>

        <IonButton expand="block" onClick={handleOpenMapForOrigin}>
          Seleccionar Lugar de Origen en el Mapa
        </IonButton>
          <IonItem>
          <IonLabel position="floating">Lugar de Origen</IonLabel>
          <IonInput
            name="originPlace"
            value={originAddress || ''}
            onIonChange={handleInputChange}
            placeholder="Lugar de Origen"
          />
          </IonItem>

        <IonButton expand="block" onClick={handleOpenMapForDestination}>
          Seleccionar Lugar de Destino en el Mapa
        </IonButton>
          <IonItem>
          <IonLabel position="floating">Lugar de Destino</IonLabel>
          <IonInput
            name="destinationPlace"
            value={destinationAddress || ''}
            onIonChange={handleInputChange}
            placeholder="Lugar de Destino"
          />
          </IonItem>

        <IonItem>
          <IonLabel>Razón del Traslado</IonLabel>
          <IonSelect name="transferReason" value={formData.transferReason} onIonChange={handleInputChange}>
            <IonSelectOption value="Emergency">Emergencia</IonSelectOption>
            <IonSelectOption value="Specialized Consultation">Consulta Especializada</IonSelectOption>
            <IonSelectOption value="Referral">Remisión</IonSelectOption>
            <IonSelectOption value="Others">Otros</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonButton expand="block" onClick={navigateToPrev}>
          Atrás
        </IonButton>
        <IonButton expand="block" onClick={navigateToNext}>
          Siguiente
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default TransferDetails;
