import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private _firestore: admin.firestore.Firestore;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const serviceAccountBase64 = this.configService.get<string>(
      'FIREBASE_SERVICE_ACCOUNT_BASE64',
    );
    const projectId = this.configService.get<string>('FIREBASE_PROJECT_ID');

    if (!serviceAccountBase64 || !projectId) {
      throw new Error(
        'Firebase credentials are not defined in the environment variables.',
      );
    }

    const serviceAccountJson = Buffer.from(
      serviceAccountBase64,
      'base64',
    ).toString('utf-8');
    const serviceAccount = JSON.parse(serviceAccountJson);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: projectId,
    });

    this._firestore = admin.firestore();
  }

  get firestore(): admin.firestore.Firestore {
    return this._firestore;
  }
}
