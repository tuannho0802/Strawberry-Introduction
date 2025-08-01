import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { User, Role } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CollectionReference } from 'firebase-admin/firestore';
import { userConverter } from './user.converter';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private firebaseService: FirebaseService) {}

  private getCollection(): CollectionReference<User> {
    return this.firebaseService.firestore
      .collection('users')
      .withConverter(userConverter);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.findOne(createUserDto.username);
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    if (createUserDto.password !== createUserDto.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const newUser: User = {
      id: '', // Dummy id, will be removed by converter
      username: createUserDto.username,
      password: hashedPassword,
      role: createUserDto.role || Role.USER, // Default to 'user'
    };

    const docRef = await this.getCollection().add(newUser);
    const snapshot = await docRef.get();
    return snapshot.data();
  }

  async findOne(username: string): Promise<User | undefined> {
    const snapshot = await this.getCollection()
      .where('username', '==', username)
      .limit(1)
      .get();
    if (snapshot.empty) {
      return undefined;
    }
    return snapshot.docs[0].data();
  }
}

