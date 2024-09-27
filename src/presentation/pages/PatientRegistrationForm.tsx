import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonButton,
  IonProgressBar,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonMenuButton,
} from "@ionic/react";
import { useIonRouter } from "@ionic/react";
import { LocalStorageService } from "../../application/services/LocalStorageService";

import GeneralInfo from "./GeneralInfo";
import TransferDetails from "./TransferDetails";
import ClinicalState from "./ClinicalState";
import MedicalProcedures from "./MedicalProcedures";

const PatientRegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
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
  const router = useIonRouter();

  useEffect(() => {
    const loadSavedData = async () => {
      const savedData = await LocalStorageService.getData("patientForm");
      if (savedData) {
        setFormData(savedData);
      }
    };
    loadSavedData();
  }, []);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    LocalStorageService.saveData("patientForm", updatedData);
  };

  const navigateToNext = () => setStep(step + 1);
  const navigateToPrev = () => setStep(step - 1);

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <GeneralInfo
            formData={formData}
            handleInputChange={handleInputChange}
            navigateToNext={navigateToNext}
          />
        );
      case 1:
        return (
          <TransferDetails
            formData={formData}
            handleInputChange={handleInputChange}
            navigateToNext={navigateToNext}
            navigateToPrev={navigateToPrev}
          />
        );
      case 2:
        return (
          <ClinicalState
            formData={formData}
            handleInputChange={handleInputChange}
            navigateToNext={navigateToNext}
            navigateToPrev={navigateToPrev}
          />
        );
      case 3:
        return (
          <MedicalProcedures
            formData={formData}
            handleInputChange={handleInputChange}
            navigateToNext={navigateToNext}
            navigateToPrev={navigateToPrev}
          />
        );
      default:
        return (
          <GeneralInfo
            formData={formData}
            handleInputChange={handleInputChange}
            navigateToNext={navigateToNext}
          />
        );
    }
  };

  const renderProgressBar = () => {
    const progress = (step + 1) / 4;
    return <IonProgressBar value={progress} color="primary" />;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Registro del Paciente</IonTitle>
        </IonToolbar>
        {renderProgressBar()}
      </IonHeader>
      <IonContent>{renderStep()}</IonContent>
    </IonPage>
  );
};

export default PatientRegistrationForm;
