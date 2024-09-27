import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';


export class FirestoreService {
  // Guardar los datos del paciente en Firestore
  async savePatientData(patientId: string, patientData: any) {
    try {
      await setDoc(doc(db, 'patients', patientId), patientData);
      console.log('Datos del paciente guardados en Firestore');
    } catch (error) {
      console.error('Error al guardar los datos del paciente en Firestore:', error);
    }
  }

  // Obtener los datos del paciente por ID
  async getPatientData(patientId: string) {
    try {
      const docRef = doc(db, 'patients', patientId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.log('No se encontró el paciente con ese ID');
        return null;
      }
    } catch (error) {
      console.error('Error al obtener los datos del paciente:', error);
      return null;
    }
  }
}
