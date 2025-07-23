/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Strawberry } from './entities/strawberry.entity';
import { CollectionReference } from 'firebase-admin/firestore';
import { strawberryConverter } from './strawberry.converter';
import { CreateStrawberryDto } from './dto/create-strawberry.dto';
import { UpdateStrawberryDto } from './dto/update-strawberry.dto';
import { ImgbbService } from 'src/imgbb/imgbb.service';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class StrawberriesService {
  constructor(
    private firebaseService: FirebaseService,
    private imgbbService: ImgbbService,
  ) {}

  private getCollection(): CollectionReference<Strawberry> {
    return this.firebaseService.firestore
      .collection('strawberries')
      .withConverter(strawberryConverter);
  }

  async create(
    createStrawberryDto: CreateStrawberryDto,
    file?: Express.Multer.File,
  ): Promise<Strawberry> {
    let imageUrl = createStrawberryDto.imageUrl;
    let deleteUrl: string | undefined;

    if (file) {
      const uploadResult = await this.imgbbService.upload(file);
      imageUrl = uploadResult.imageUrl;
      deleteUrl = uploadResult.deleteUrl;
    }

    const newStrawberry: Strawberry = {
      id: '',
      ...createStrawberryDto,
      imageUrl,
      deleteUrl,
    };
    const docRef = await this.getCollection().add(newStrawberry);
    const snapshot = await docRef.get();
    return snapshot.data();
  }

  async findAll(): Promise<Strawberry[]> {
    const snapshot = await this.getCollection().get();
    return snapshot.docs.map((doc) => doc.data());
  }

  async findOne(id: string): Promise<Strawberry> {
    const snapshot = await this.getCollection().doc(id).get();
    if (!snapshot.exists) {
      return null;
    }
    return snapshot.data();
  }

  async update(
    id: string,
    updateStrawberryDto: UpdateStrawberryDto,
    file?: Express.Multer.File,
  ): Promise<Strawberry> {
    const updatePayload: Partial<Strawberry> = { ...updateStrawberryDto };

    if (file) {
      const strawberry = await this.findOne(id);
      if (strawberry && strawberry.deleteUrl) {
        try {
          await this.imgbbService.delete(strawberry.deleteUrl);
        } catch (error) {
          console.error('Failed to delete old image', error);
        }
      }
      const uploadResult = await this.imgbbService.upload(file);
      updatePayload.imageUrl = uploadResult.imageUrl;
      updatePayload.deleteUrl = uploadResult.deleteUrl;
    }

    if (Object.keys(updatePayload).length > 0) {
      await this.getCollection().doc(id).update(updatePayload);
    }

    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const strawberry = await this.findOne(id);
    if (strawberry && strawberry.deleteUrl) {
      await this.imgbbService.delete(strawberry.deleteUrl);
    }
    await this.getCollection().doc(id).delete();
  }
}

