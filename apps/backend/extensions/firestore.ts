import admin from "firebase-admin";
import {
  Database,
  DatabaseConfiguration,
} from "@hocuspocus/extension-database";

export interface FirestoreExtensionConfiguration extends DatabaseConfiguration {
  collection: string;
  firestore?: admin.firestore.Firestore;
}

export class FirestoreExtension extends Database {
  configuration: FirestoreExtensionConfiguration = {
    fetch: async ({ documentName }) => {
      const doc = await this.configuration.firestore
        ?.collection(this.configuration.collection)
        .doc(documentName)
        .get();

      if (!doc?.exists) {
        throw new Error(
          `[Firestore Extension] Document ${documentName} not found`
        );
      }

      return doc.get("data");
    },
    store: async ({ documentName, state }) => {
      const docRef = this.configuration.firestore
        ?.collection(this.configuration.collection)
        .doc(documentName);

      return docRef?.update({ data: state });
    },
    collection: process.env.NEXT_PUBLIC_ENVIRONMENT as string,
  };

  constructor(
    configuration: Required<
      Pick<FirestoreExtensionConfiguration, "firestore">
    > &
      Partial<Omit<FirestoreExtensionConfiguration, "firestore">>
  ) {
    super({});

    this.configuration = {
      ...this.configuration,
      ...configuration,
    };
  }
}
