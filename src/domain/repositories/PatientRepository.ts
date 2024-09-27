import { Patient } from "../entities/Patient";

export interface PatientRepository {
  save(patient: Patient): Promise<void>;
  getAll(): Promise<Patient[]>;
  getById(id: string): Promise<Patient | null>;
}
