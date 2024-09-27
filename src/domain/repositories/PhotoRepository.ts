import { Photo } from "../entities/Photo";

export interface PhotoRepository {
  save(photo: Photo): Promise<Photo>;
  getAll(): Promise<Photo[]>;
}