import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase-admin/firestore';
import { User, Role } from './entities/user.entity';

export const userConverter: FirestoreDataConverter<User> = {
  toFirestore(user: User): DocumentData {
    const { id, ...data } = user;
    return data;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): User {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      username: data.username,
      password: data.password,
      role: data.role as Role,
    };
  },
};
