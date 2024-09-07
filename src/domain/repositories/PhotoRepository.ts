import { Photo } from "../entities/Photo";

export interface PhotoRepository {
  save(photo: Photo): Promise<void>;
  getAll(): Promise<Photo[]>;
}
