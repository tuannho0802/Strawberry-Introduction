import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase-admin/firestore';
import { Strawberry } from './entities/strawberry.entity';

export const strawberryConverter: FirestoreDataConverter<Strawberry> = {
  toFirestore(strawberry: Strawberry): DocumentData {
    const { id, ...data } = strawberry;
    return data;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Strawberry {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      name: data.name,
      description: data.description,
      imageUrl: data.imageUrl,
    };
  },
};
