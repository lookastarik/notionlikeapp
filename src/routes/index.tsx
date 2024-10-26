import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { Auth } from '../components/Auth';
import { MainLayout } from '../layouts/MainLayout';
import { Editor } from '../components/Editor';
import { Welcome } from '../components/Welcome';

export function AppRoutes() {
  const { user } = useAuthContext();

  if (!user) {
    return <Auth />;
  }

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/page/:id" element={<Editor />} />
        <Route path="/" element={<Welcome />} />
      </Route>
    </Routes>
  );
}