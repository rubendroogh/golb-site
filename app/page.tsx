'use client'

import { HeaderNavigation } from '@/components/HeaderNavigation/HeaderNavigation';
import { Welcome } from '../components/Welcome/Welcome';
import { BlogsHome } from '@/components/BlogsHome/BlogsHome';

export default function HomePage() {
  return (
    <>
        <HeaderNavigation />
        <Welcome />
        <BlogsHome />
    </>
  );
}
