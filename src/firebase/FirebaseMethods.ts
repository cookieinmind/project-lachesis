import {
  doc,
  collection,
  addDoc,
  getDoc,
  setDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { PublicUserData, Story } from '../models/ServerModels';
import { Collections } from './References';
import { firestore as db } from './firebase_config';

//! User models
export async function CreateUserModel(
  uid: string,
  user: PublicUserData
): Promise<void> {
  try {
    const users = collection(db, Collections.Users);
    const userDocRef = doc(users, uid);
    await setDoc(userDocRef, user);
  } catch (error) {
    throw error;
  }
}

//! Stories

/**
 *
 * @param story the story to add to the database
 * @returns the id of the newly created story
 */
export async function AddNewStory(story: Story): Promise<string> {
  const stories = collection(db, Collections.Stories);
  try {
    const docReference = await addDoc(stories, story);
    return docReference.id;
  } catch (error) {
    throw error;
  }
}

export async function GetUserStories(uid: string): Promise<Story[]> {
  const storiesCol = collection(db, Collections.Stories);

  const q = query(storiesCol, where('author_uid', '==', uid));

  const docs = await getDocs(q);

  const data: Story[] = [];

  docs.forEach((d) => data.push(d.data() as Story));

  return data;
}

export async function GetStory(storyId: string): Promise<Story> {
  const storiesCol = collection(db, Collections.Stories);
  const storyRef = doc(storiesCol, storyId);

  const docRef = await getDoc(storyRef);

  return docRef.data() as Story;
}
