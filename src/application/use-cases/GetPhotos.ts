import { PhotoRepository } from "../../domain/repositories/PhotoRepository";
import { Photo } from "../../domain/entities/Photo";

export class GetPhotos {
  constructor(private photoRepository: PhotoRepository) {}

  async execute(): Promise<Photo[]> {
    return await this.photoRepository.getAll();
  }
}
