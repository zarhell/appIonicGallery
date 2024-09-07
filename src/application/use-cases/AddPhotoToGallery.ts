import { takePhoto } from "../services/PhotoService";  // Named import for takePhoto
import { PhotoRepository } from "../../domain/repositories/PhotoRepository";
import { Photo } from "../../domain/entities/Photo";

export class AddPhotoToGallery {
  constructor(private photoRepository: PhotoRepository) {}

  async execute(): Promise<Photo> {
    const newPhoto = await takePhoto();  // Directly use takePhoto
    await this.photoRepository.save(newPhoto);
    return newPhoto;
  }
}
