import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { Strawberry } from './entities/strawberry.entity';
import { CollectionReference } from 'firebase-admin/firestore';
import { strawberryConverter } from './strawberry.converter';
import { CreateStrawberryDto } from './dto/create-strawberry.dto';

@Injectable()
export class StrawberriesService {
  constructor(private firebaseService: FirebaseService) {}

  private getCollection(): CollectionReference<Strawberry> {
    return this.firebaseService.firestore
      .collection('strawberries')
      .withConverter(strawberryConverter);
  }

  async create(createStrawberryDto: CreateStrawberryDto): Promise<Strawberry> {
    // The 'id' can be a dummy value because the converter will remove it.
    const newStrawberry: Strawberry = {
      id: '',
      ...createStrawberryDto,
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
    strawberry: Partial<Strawberry>,
  ): Promise<Strawberry> {
    await this.getCollection().doc(id).update(strawberry);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.getCollection().doc(id).delete();
  }
}
