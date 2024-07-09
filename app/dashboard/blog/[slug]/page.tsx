import { HeaderNavigation } from '@/components/HeaderNavigation/HeaderNavigation';
import {
    Anchor,
    Title,
    Container,
    Text,
    Divider,
    Button,
    Paper,
    Image,
} from '@mantine/core';
import { db } from "@/firebase/adminApp";
import { blogConverterServer } from '@/interfaces/Blog';
import { FooterSocial } from '@/components/FooterSocial/FooterSocial';
import { redirect, RedirectType } from 'next/navigation';
import { BlogEditForm } from '@/components/BlogEditForm/BlogEditForm';

export default async function Blog({ params }: { params: { slug: string } }) {
    if (params.slug == '') {
        redirect('/dashboard', RedirectType.replace);
    }

    const blogRef = db.collection("blogs").withConverter(blogConverterServer).doc(params.slug);
    const blogSnapshot = await blogRef.get();
    
    if (!blogSnapshot.exists) {
        redirect('/dashboard', RedirectType.replace);
    }

    const blog = blogSnapshot.data();

    const contributors = blog?.contributors.map((name, index) => (
        <span key={index}>{name}</span>
    ));
    const blogText = blog?.content.replaceAll('\\n', '\n');

    return (
        <>
            <HeaderNavigation />
            <Container maw={1200} mx="auto" mb="32">
                <Anchor size="sm" opacity={.9} href="/">↜ Back to home</Anchor>
                <Title>Edit blog</Title>
                <Divider my="md" />
                <BlogEditForm blog={blog} slug={params.slug} />
            </Container>
            <FooterSocial/>
        </>
    );
}