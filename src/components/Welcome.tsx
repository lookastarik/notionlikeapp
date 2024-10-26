import React from 'react';
import { FileText } from 'lucide-react';

export function Welcome() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-500">
      <FileText className="w-16 h-16 mb-4" />
      <p className="text-lg">Select a page or create a new one</p>
    </div>
  );
}