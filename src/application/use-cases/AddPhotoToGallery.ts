import { PhotoRepository } from "../../domain/repositories/PhotoRepository";
import { Photo } from "../../domain/entities/Photo";
import { takePhoto } from "../services/PhotoService";

export class AddPhotoToGallery {
  constructor(private photoRepository: PhotoRepository) {}

  async execute(): Promise<Photo> {
    const newPhoto = await takePhoto();
    await this.photoRepository.save(newPhoto);
    return newPhoto;
  }
}
