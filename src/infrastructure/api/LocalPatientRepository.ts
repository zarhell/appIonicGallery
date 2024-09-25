import { Preferences } from '@capacitor/preferences';
import { Patient } from "../../domain/entities/Patient";
import { PatientRepository } from "../../domain/repositories/PatientRepository";

export class LocalPatientRepository implements PatientRepository {
  async save(patient: Patient): Promise<void> {
    const patients = await this.getAll();
    patients.push(patient);
    await Preferences.set({
      key: 'patients',
      value: JSON.stringify(patients),
    });
  }

  async getAll(): Promise<Patient[]> {
    const { value } = await Preferences.get({ key: 'patients' });
    return value ? JSON.parse(value) : [];
  }

  async getById(id: string): Promise<Patient | null> {
    const patients = await this.getAll();
    return patients.find(patient => patient.id === id) || null;
  }
}
