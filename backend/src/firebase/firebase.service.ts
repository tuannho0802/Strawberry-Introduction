import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private _firestore: admin.firestore.Firestore;
  private _storage: admin.storage.Storage;

  onModuleInit() {
    if (admin.apps.length === 0) {
      const serviceAccountPath = path.join(
        process.cwd(),
        'firebase-service-account.json',
      );

      if (!fs.existsSync(serviceAccountPath)) {
        throw new Error(
          'Firebase service account file not found at ' + serviceAccountPath,
        );
      }

      const serviceAccount = JSON.parse(
        fs.readFileSync(serviceAccountPath, 'utf8'),
      );

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: serviceAccount.project_id,
        storageBucket: `${serviceAccount.project_id}.appspot.com`,
      });
    }

    this._firestore = admin.firestore();
    this._storage = admin.storage();
  }

  get firestore(): admin.firestore.Firestore {
    return this._firestore;
  }

  get storage(): admin.storage.Storage {
    return this._storage;
  }
}

