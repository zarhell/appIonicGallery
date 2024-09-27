import { CapacitorSQLite, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';

export class SQLiteService {
    private db: SQLiteDBConnection | null = null;

    constructor() { }

    async initDB() {
        try {
        
            if (Capacitor.isNativePlatform()) {
                const connection = (await CapacitorSQLite.createConnection({
                  database: "patient_data",
                  version: 1,
                  encrypted: false,
                  mode: "no-encryption",
                })) as unknown as SQLiteDBConnection;

                if (connection) {
                    this.db = connection;
                    await this.db.open();
                    await this.createTable();
                } else {
                    throw new Error('No se pudo crear la conexión con SQLite.');
                }
            } else {
                console.warn('SQLite solo está disponible en plataformas nativas.');
            }
        } catch (error) {
            console.error("Error al inicializar la base de datos:", error);
        }
    }

    private async createTable() {
        if (this.db) {
            const query = `
        CREATE TABLE IF NOT EXISTS patient (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          fullName TEXT,
          idNumber TEXT,
          age INTEGER,
          gender TEXT,
          transferDate TEXT,
          originPlace TEXT,
          destinationPlace TEXT,
          heartRate TEXT,
          bloodPressure TEXT,
          temperature TEXT,
          ambulanceNumber TEXT,
          ambulanceType TEXT,
          transferReason TEXT
        );
      `;
            try {
                await this.db.execute(query);
                console.log('Tabla "patient" creada correctamente.');
            } catch (error) {
                console.error('Error al crear la tabla patient:', error);
            }
        }
    }


    async savePatientData(formData: any) {
        if (this.db) {
            const query = `
        INSERT INTO patient (
          fullName, idNumber, age, gender, transferDate, originPlace, destinationPlace, heartRate, bloodPressure, temperature, ambulanceNumber, ambulanceType, transferReason
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      `;
            const values = [
                formData.fullName,
                formData.idNumber,
                formData.age,
                formData.gender,
                formData.transferDate,
                formData.originPlace,
                formData.destinationPlace,
                formData.heartRate,
                formData.bloodPressure,
                formData.temperature,
                formData.ambulanceNumber,
                formData.ambulanceType,
                formData.transferReason,
            ];

            try {
                await this.db.run(query, values);
                console.log("Datos del paciente guardados en SQLite");
            } catch (error) {
                console.error("Error al guardar los datos del paciente:", error);
            }
        }
    }


    async closeConnection() {
        if (this.db) {
            try {
                await this.db.close();
                console.log('Conexión con SQLite cerrada.');
                this.db = null;
            } catch (error) {
                console.error('Error al cerrar la conexión con SQLite:', error);
            }
        }
    }
}
