import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonModal,
} from "@ionic/react";
import { useHistory, useLocation } from "react-router-dom";
import { LocalStorageService } from "../../application/services/LocalStorageService";
import { ReverseGeocodeService } from "../../application/services/ReverseGeocodeService";

// Definir interfaces
interface FormData {
  fullName: string;
  idNumber: string;
  age: string;
  gender: string;
  transferDate: string;
  originPlace: string;
  destinationPlace: string;
  heartRate: string;
  bloodPressure: string;
  temperature: string;
  ambulanceNumber: string;
  ambulanceType: string;
  transferReason: string;
}

interface LocationState {
  selectedLocation?: {
    latitude: number;
    longitude: number;
  };
}

interface FormProps {
  formData: FormData;
  handleInputChange: (e: any) => void;
  navigateToNext?: () => void;
  navigateToPrev?: () => void;
  handleSubmit?: () => void;
}

// Componente reutilizable para IonInput
const FormItemInput: React.FC<{ label: string; name: string; value: string; type?: string; handleInputChange: (e: any) => void }> = ({
  label,
  name,
  value,
  type = "text",
  handleInputChange,
}) => (
  <IonItem>
    <IonLabel position="floating">{label}</IonLabel>
    <IonInput name={name} type={type} value={value} onIonChange={handleInputChange} />
  </IonItem>
);

// Componente reutilizable para IonSelect
const FormItemSelect: React.FC<{ label: string; name: string; value: string; options: { value: string; label: string }[]; handleInputChange: (e: any) => void }> = ({
  label,
  name,
  value,
  options,
  handleInputChange,
}) => (
  <IonItem>
    <IonLabel>{label}</IonLabel>
    <IonSelect name={name} value={value} onIonChange={handleInputChange}>
      {options.map((option) => (
        <IonSelectOption key={option.value} value={option.value}>
          {option.label}
        </IonSelectOption>
      ))}
    </IonSelect>
  </IonItem>
);

// GeneralInfo
const GeneralInfo: React.FC<FormProps> = ({ formData, handleInputChange, navigateToNext }) => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Información General</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <FormItemInput label="Nombre Completo" name="fullName" value={formData.fullName} handleInputChange={handleInputChange} />
      <FormItemInput label="Número de Identificación" name="idNumber" value={formData.idNumber} handleInputChange={handleInputChange} />
      <FormItemInput label="Edad" name="age" value={formData.age} type="number" handleInputChange={handleInputChange} />
      <FormItemSelect
        label="Género"
        name="gender"
        value={formData.gender}
        options={[
          { value: "Male", label: "Masculino" },
          { value: "Female", label: "Femenino" },
          { value: "Other", label: "Otro" },
        ]}
        handleInputChange={handleInputChange}
      />
      <IonButton expand="block" onClick={navigateToNext}>
        Siguiente
      </IonButton>
    </IonContent>
  </IonPage>
);

// TransferDetails con selector de fecha en modal
const TransferDetails: React.FC<FormProps> = ({ formData, handleInputChange, navigateToNext, navigateToPrev }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [originAddress, setOriginAddress] = useState<string | null>(null);
  const [destinationAddress, setDestinationAddress] = useState<string | null>(null);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

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
      if (latitude && longitude) {
        const reverseGeocodeService = new ReverseGeocodeService();
        const foundAddress = await reverseGeocodeService.getAddressFromCoordinates(latitude, longitude);
        setOriginAddress(foundAddress);
      }
    };
    fetchAddress();
  }, [latitude, longitude]);

  // Abrir el mapa para seleccionar "Lugar de Origen"
  const handleOpenMapForOrigin = () => {
    history.push("/map?type=origin");
  };

  // Abrir el mapa para seleccionar "Lugar de Destino"
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

        {/* Lugar de Origen */}
        <IonButton expand="block" onClick={handleOpenMapForOrigin}>
          Seleccionar Lugar de Origen en el Mapa
        </IonButton>
        {originAddress && (
          <IonItem>
            <IonLabel>Lugar de Origen: {originAddress}</IonLabel>
          </IonItem>
        )}

        {/* Lugar de Destino */}
        <IonButton expand="block" onClick={handleOpenMapForDestination}>
          Seleccionar Lugar de Destino en el Mapa
        </IonButton>
        {destinationAddress && (
          <IonItem>
            <IonLabel>Lugar de Destino: {destinationAddress}</IonLabel>
          </IonItem>
        )}

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

// ClinicalState
const ClinicalState: React.FC<FormProps> = ({ formData, handleInputChange, navigateToNext, navigateToPrev }) => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Estado Clínico</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <FormItemInput label="Frecuencia Cardíaca" name="heartRate" value={formData.heartRate} type="number" handleInputChange={handleInputChange} />
      <FormItemInput label="Presión Arterial" name="bloodPressure" value={formData.bloodPressure} handleInputChange={handleInputChange} />
      <FormItemInput label="Temperatura" name="temperature" value={formData.temperature} type="number" handleInputChange={handleInputChange} />
      <IonButton expand="block" onClick={navigateToPrev}>
        Atrás
      </IonButton>
      <IonButton expand="block" onClick={navigateToNext}>
        Siguiente
      </IonButton>
    </IonContent>
  </IonPage>
);

// MedicalProcedures
const MedicalProcedures: React.FC<FormProps> = ({ formData, handleInputChange, navigateToPrev, handleSubmit }) => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Procedimientos Médicos</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <FormItemInput label="Número de Ambulancia" name="ambulanceNumber" value={formData.ambulanceNumber} handleInputChange={handleInputChange} />
      <FormItemSelect
        label="Tipo de Ambulancia"
        name="ambulanceType"
        value={formData.ambulanceType}
        options={[
          { value: "Basic", label: "Básica" },
          { value: "Medicalized", label: "Medicalizada" },
          { value: "Neonatal", label: "Neonatal" },
          { value: "Psychiatric", label: "Psiquiátrica" },
        ]}
        handleInputChange={handleInputChange}
      />
      <IonButton expand="block" onClick={navigateToPrev}>
        Atrás
      </IonButton>
      <IonButton expand="block" onClick={handleSubmit}>
        Finalizar Registro
      </IonButton>
    </IonContent>
  </IonPage>
);

// Componente principal
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
  });

  const [step, setStep] = useState(0);

  useEffect(() => {
    const loadFormData = async () => {
      const savedData = await LocalStorageService.getData("patientForm");
      if (savedData) {
        setFormData(savedData);
      }
    };
    loadFormData();
  }, []);

  const handleInputChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    await LocalStorageService.saveData("patientForm", formData);
    alert("Paciente registrado con éxito");
  };

  const navigateToNext = () => setStep(step + 1);
  const navigateToPrev = () => setStep(step - 1);

  const renderStep = () => {
    switch (step) {
      case 0:
        return <GeneralInfo formData={formData} handleInputChange={handleInputChange} navigateToNext={navigateToNext} />;
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
