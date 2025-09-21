import { User } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { responseUser } from '@/types/types';

/**
 * Fetches user data from Firestore for a given user.
 * @param user The authenticated user object from Firebase Auth.
 * @returns A promise that resolves with the user's data or null if not found.
 */
export default async function getUserData(user: User): Promise<responseUser | null> {
    if (!user) {
        console.error("User must be provided to fetch data.");
        return null;
    }
    try {
        // Note: 'userId' is an unconventional collection name. Usually it would be 'users'.
        const collRef = collection(db, 'userId');
        const q = query(collRef, where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            console.log("No matching documents for user:", user.uid);
            return null;
        }
        // Assuming there is only one document for a given user UID.
        const docData = querySnapshot.docs[0].data();
        const userData: responseUser = {
            categories: docData.categories || [],
            habits: docData.habits || [],
            tasks: docData.tasks || [],
            uid: docData.uid,
        };
        return userData;
    } catch (err) {
        console.error("Error fetching user data:", err);
        return null;
    }
}