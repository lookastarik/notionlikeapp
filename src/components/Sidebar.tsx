import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PlusCircle, File } from 'lucide-react';
import { usePages } from '../hooks/usePages';
import { Page } from '../types';

export function Sidebar() {
  const location = useLocation();
  const { pages, createPage } = usePages();

  return (
    <div className="w-64 border-r bg-gray-50 overflow-auto">
      <div className="p-4">
        <button
          onClick={createPage}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Page</span>
        </button>
      </div>
      
      <nav className="px-3 py-2">
        {pages.map((page: Page) => (
          <Link
            key={page.id}
            to={`/page/${page.id}`}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
              location.pathname === `/page/${page.id}`
                ? 'bg-gray-200'
                : 'hover:bg-gray-100'
            }`}
          >
            <File className="w-4 h-4 text-gray-500" />
            <span className="text-sm">{page.title || 'Untitled'}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}