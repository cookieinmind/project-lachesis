import {
  doc,
  collection,
  addDoc,
  getDoc,
  setDoc,
  query,
  where,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { Chapter, PublicUserData, Story } from '../models/ServerModels';
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

export async function UpdateStory(
  story_id: string,
  story: Story
): Promise<void> {
  const storyCol = collection(db, Collections.Stories);
  const chapRef = doc(storyCol, story_id);
  await updateDoc(chapRef, story);
}

//! Chapters

/**
 *
 * @param chapter chapter to add to the db
 * @returns the id of the saved chapter
 */
export async function AddNewChapter(chapter: Chapter): Promise<string> {
  const chapters = collection(db, Collections.Chapters);
  try {
    const docReference = await addDoc(chapters, chapter);
    return docReference.id;
  } catch (error) {
    throw error;
  }
}

export async function GetChapters(
  story_id: string
): Promise<{ chapters: Chapter[]; ids: string[] }> {
  const chaptersCol = collection(db, Collections.Chapters);

  const q = query(chaptersCol, where('story_id', '==', story_id));

  const docs = await getDocs(q);

  const chapters: Chapter[] = [];
  const ids: string[] = [];

  docs.forEach((d) => {
    chapters.push(d.data() as Chapter);
    ids.push(d.id);
  });

  return { chapters, ids };
}

export async function GetChapter(chapter_id: string): Promise<Chapter> {
  const chaptesCol = collection(db, Collections.Chapters);
  const chapRef = doc(chaptesCol, chapter_id);

  const docRef = await getDoc(chapRef);

  return docRef.data() as Chapter;
}

export async function UpdateChapter(
  chapter_id: string,
  chapter: Chapter
): Promise<void> {
  const chaptesCol = collection(db, Collections.Chapters);
  const chapRef = doc(chaptesCol, chapter_id);
  await updateDoc(chapRef, chapter);
}
