import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, query, where, onSnapshot, addDoc, Timestamp } from 'firebase/firestore';
import { useAuth } from './useAuth';
import { Page } from '../types';

export function usePages() {
  const [pages, setPages] = useState<Page[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'pages'),
      where('userId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const pages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: (doc.data().createdAt as Timestamp).toDate(),
        updatedAt: (doc.data().updatedAt as Timestamp).toDate()
      })) as Page[];
      setPages(pages);
    });

    return unsubscribe;
  }, [user]);

  const createPage = async () => {
    if (!user) return;

    await addDoc(collection(db, 'pages'), {
      title: 'Untitled',
      content: '',
      userId: user.uid,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
  };

  return { pages, createPage };
}