import { Redirect } from 'expo-router';
import React from 'react';

// This file is required for expo-router to work
// But we'll redirect to our existing app structure
export default function Page() {
  return <Redirect href="/_layout" />;
} 