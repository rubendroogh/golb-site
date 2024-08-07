import { HeaderNavigation } from '@/components/HeaderNavigation/HeaderNavigation';
import { Welcome } from '../components/Welcome/Welcome';
import { BlogsHome } from '@/components/BlogsHome/BlogsHome';
import { FooterSocial } from '@/components/FooterSocial/FooterSocial';

export default function HomePage() {
  return (
    <>
        <HeaderNavigation />
        <Welcome />
        <BlogsHome />
        <FooterSocial/>
    </>
  );
}
