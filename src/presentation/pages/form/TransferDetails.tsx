import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonModal, IonDatetime, IonInput, IonSelect, IonSelectOption } from '@ionic/react';
import MapPage from '../MapPage'; // Import the Map component as a modal
import { FormProps } from './types';
import { ReverseGeocodeService } from '../../../application/services/ReverseGeocodeService';
import { LocalStorageService } from '../../../application/services/LocalStorageService';

const TransferDetails: React.FC<FormProps> = ({ formData, handleInputChange, navigateToNext, navigateToPrev }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false); // State to show/hide the map modal
  const [originAddress, setOriginAddress] = useState<string | null>(formData.originPlace);
  const [destinationAddress, setDestinationAddress] = useState<string | null>(formData.destinationPlace);
  const [mapType, setMapType] = useState<string | null>(null); // To handle origin/destination selection

  // Load the location saved in localStorage
  useEffect(() => {
    const loadSelectedLocation = async () => {
      const selectedLocation = await LocalStorageService.getData('selectedLocation');
      if (selectedLocation) {
        const reverseGeocodeService = new ReverseGeocodeService();
        const foundAddress = await reverseGeocodeService.getAddressFromCoordinates(selectedLocation.latitude, selectedLocation.longitude);

        if (mapType === 'origin') {
          setOriginAddress(foundAddress);
          handleInputChange({ target: { name: 'originPlace', value: foundAddress } });
        } else if (mapType === 'destination') {
          setDestinationAddress(foundAddress);
          handleInputChange({ target: { name: 'destinationPlace', value: foundAddress } });
        }
      }
    };
    loadSelectedLocation();
  }, [mapType, handleInputChange]);

  const handleDateChange = (e: any) => {
    const selectedDate = e.detail.value;
    handleInputChange({ target: { name: "transferDate", value: selectedDate } });
    setShowCalendar(false);
  };

  const handleManualInputChange = (e: any) => {
    const { name, value } = e.target;
    handleInputChange(e);

    if (name === 'originPlace') {
      setOriginAddress(value);
    } else if (name === 'destinationPlace') {
      setDestinationAddress(value);
    }
  };

  // Open the map modal and define the type (origin/destination)
  const openMapForOrigin = () => {
    setMapType('origin');
    setShowMapModal(true);
  };

  const openMapForDestination = () => {
    setMapType('destination');
    setShowMapModal(true);
  };

  // Close the map modal after selecting a location
  const handleCloseMapModal = (selectedLocation: { latitude: number, longitude: number }) => {
    setShowMapModal(false); // Close the map modal

    if (selectedLocation) {
      const reverseGeocodeService = new ReverseGeocodeService();
      reverseGeocodeService.getAddressFromCoordinates(selectedLocation.latitude, selectedLocation.longitude)
        .then((foundAddress) => {
          if (mapType === 'origin') {
            setOriginAddress(foundAddress);
            handleInputChange({ target: { name: 'originPlace', value: foundAddress } });
          } else if (mapType === 'destination') {
            setDestinationAddress(foundAddress);
            handleInputChange({ target: { name: 'destinationPlace', value: foundAddress } });
          }
        });
    }
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

        <IonButton expand="block" onClick={openMapForOrigin}>
          Seleccionar Lugar de Origen en el Mapa
        </IonButton>
        <IonItem>
          <IonInput
            name="originPlace"
            value={originAddress || ''}
            placeholder="Lugar de Origen"
            onIonChange={handleManualInputChange}
          />
        </IonItem>

        <IonButton expand="block" onClick={openMapForDestination}>
          Seleccionar Lugar de Destino en el Mapa
        </IonButton>
        <IonItem>
          <IonInput
            name="destinationPlace"
            value={destinationAddress || ''}
            placeholder="Lugar de Destino"
            onIonChange={handleManualInputChange}
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

        {/* Modal for showing map */}
        <IonModal isOpen={showMapModal} onDidDismiss={() => setShowMapModal(false)}>
          <MapPage onLocationSelect={handleCloseMapModal} /> {/* Pass callback to close modal */}
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default TransferDetails;
