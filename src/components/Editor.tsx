import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { IndexeddbPersistence } from 'y-indexeddb';
import { useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ydoc = new Y.Doc();
const provider = new WebrtcProvider('notion-clone', ydoc);
new IndexeddbPersistence('notion-clone', ydoc);

export function Editor() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Collaboration.configure({
        document: ydoc,
      }),
      CollaborationCursor.configure({
        provider,
        user: {
          name: user?.displayName || 'Anonymous',
          color: '#' + Math.floor(Math.random()*16777215).toString(16),
        },
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none',
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <EditorContent editor={editor} className="min-h-[500px] p-4 border rounded-lg" />
    </div>
  );
}