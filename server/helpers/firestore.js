const firebase = require('firebase/compat/app');
require('firebase/compat/firestore'); 
require('dotenv').config();

const { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId } = process.env;

const firebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const readFirestoreDocument = async (collectionId, docId) => {
    const documentReference = db.collection(collectionId).doc(docId);

    return documentReference.get()
        .then(doc => {
        if (!doc.exists) {
            console.log('Document not found');
            return null;
        } else {
            console.log('Document data:', doc.data());
            return doc.data();
        }
        })
        .catch(error => {
        console.error('Error getting document:', error);
        throw error; // You can handle the error as per your application's needs
        });
};

const writeFirestoreDocument = async (collectionId, docId, data) => {
    const documentReference = db.collection(collectionId).doc(docId);
    documentReference.set(data)
    .then(() => {
        console.log('Document successfully written to Firestore!');
    })
    .catch((error) => {
        console.error('Error writing document: ', error);
    });
};

const updateFirestoreDocument = async (collectionId, docId, data) => {
  const documentReference = db.collection(collectionId).doc(docId);
  documentReference.update(data)
  .then(() => {
      console.log('Document successfully written to Firestore!');
  })
  .catch((error) => {
      console.error('Error writing document: ', error);
  });
};

const readAllDocumentsFromCollection = async (collectionId) => {
    const collectionReference = db.collection(collectionId);
  
    return collectionReference.get()
      .then(snapshot => {
        const documents = [];
        snapshot.forEach(doc => {
          documents.push({
            id: doc.id,
            data: doc.data()
          });
        });
        return documents;
      })
      .catch(error => {
        console.error('Error getting documents from collection:', error);
        throw error;
      });
  };

const readAllNestedDocs = async (mainCollectionId, subCollectionId) => {
  try {
    const userChallengesRef = await db.collection(mainCollectionId);
    console.log(`userChallengesRef: ${userChallengesRef}`);

    const userChallengesSnapshot = await userChallengesRef.get();
    console.log(`userChallengesSnapshot: ${userChallengesSnapshot}`);

    const allChallenges = [];

    await Promise.all(
      userChallengesSnapshot.docs.map(async (userChallengeDoc) => {
        console.log(`userChallengeDoc: ${userChallengeDoc}`);

        const challengesSubcollectionRef = userChallengeDoc.ref.collection(subCollectionId);

        const challengesSnapshot = await challengesSubcollectionRef.get();

        challengesSnapshot.forEach((challengeDoc) => {
          console.log(`challengeDoc: ${challengeDoc}`);
          allChallenges.push({
            userAddress: userChallengeDoc.id,
            challengeId: challengeDoc.id,
            data: challengeDoc.data(),
          });
        });
      })
    );

    return allChallenges;
  } catch (error) {
    console.error("Error reading user challenges:", error);
    throw error;
  }
};


const writeNestedDocs = async (mainCollection, docId, subCollection, data) => {
  const dataWithTimestamp = {
    createdAt: new Date(),
  };

  const mainCollectionRef = await db.collection(mainCollection);
  const mainDocRef = await mainCollectionRef.doc(docId);

  await mainDocRef.set(dataWithTimestamp, { merge: true });

    if (subCollection) {
    const nestedCollectionRef = await mainDocRef.collection(subCollection);
    await nestedCollectionRef.doc().set(data, { merge: true });
  }
}



const readNestedDocs = async (mainCollection, docId, subCollection) => {
  const mainCollectionRef = await db.collection(mainCollection);
  const mainDocRef = await mainCollectionRef.doc(docId);
  const nestedCollectionRef = await mainDocRef.collection(subCollection);
  const querySnapshot = await nestedCollectionRef.get();

  const docs = [];
  querySnapshot.forEach((doc) => {
    docs.push(doc.data());
  });

  return docs;
}

const getSub = async (mainCollection) => {
  const sfRef = db.collection(mainCollection).doc("0xC348918eC17359E0883Fa7039940B9231073dBb5");
const collections = await sfRef.listCollections();
collections.forEach(collection => {
  console.log('Found subcollection with id:', collection.id);
});
}

const readAllNestedDocs2 = async (mainCollectionId, subCollectionId) => {
  try {
    const userChallengesRef = await db.collection(mainCollectionId);
    console.log(`userChallengesRef: ${userChallengesRef}`);

    const userChallengesSnapshot = await userChallengesRef.get();
    console.log(`userChallengesSnapshot: ${userChallengesSnapshot}`);

    const allChallenges = [];

    await Promise.all(
      userChallengesSnapshot.docs.map(async (userChallengeDoc) => {
        console.log(`userChallengeDoc: ${userChallengeDoc}`);

        const challengesSubcollectionRef = userChallengeDoc.ref.collection(subCollectionId);

        const challengesSnapshot = await challengesSubcollectionRef.get();

        challengesSnapshot.forEach((challengeDoc) => {
          console.log(`challengeDoc: ${challengeDoc}`);
          allChallenges.push({
            userAddress: userChallengeDoc.id,
            challengeId: challengeDoc.id,
            data: challengeDoc.data(),
          });
        });
      })
    );

    return allChallenges;
  } catch (error) {
    console.error("Error reading user challenges:", error);
    throw error;
  }
};


module.exports = {
    readFirestoreDocument,
    writeFirestoreDocument,
    readAllDocumentsFromCollection,
    writeNestedDocs,
    readNestedDocs,
    readAllNestedDocs,
    updateFirestoreDocument
}