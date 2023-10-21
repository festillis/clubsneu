import admin from 'firebase-admin';

/**
 * Verifies a Firebase auth token and returns the user's uid.
 */
const verifyIdToken = async (token: string): Promise<string | undefined> => {
  return admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => decodedToken.uid)
    .catch((_) => undefined);
};

export default verifyIdToken;
