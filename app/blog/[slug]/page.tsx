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
import { BlogText } from '@/components/BlogText/BlogText';

export default async function Blog({ params }: { params: { slug: string } }) {
    const blogNotFound = (
        <>
            <HeaderNavigation />
            <Paper shadow="lg" maw={580} ta="right" mx="auto" p={32} bg="#2e2e2e">
                <Title td="italic">
                    This blog can't be found.
                </Title>
                <Text size="md" mt="xs">
                    Is it your fault or ours? No-one will ever know.
                </Text>
                <Anchor href="/">
                    <Button variant="outline" size="md" mt="xl">
                        Return to home page
                    </Button>
                </Anchor>
            </Paper>
        </>
    );

    if (params.slug == '') {
        return blogNotFound;
    }

    const blogRef = db.collection("blogs").withConverter(blogConverterServer).doc(params.slug);
    const blogSnapshot = await blogRef.get();
    
    if (!blogSnapshot.exists) {
        return blogNotFound;
    }

    const blog = blogSnapshot.data();

    const contributors = blog?.contributors.join(', ');
    const blogText = blog?.content.replaceAll('\\n', '\n');

    return (
        <>
            <HeaderNavigation />
                <Container maw={1200} mx="auto" mb="32">
                    <Anchor size="sm" opacity={.9} href="/">↜ Back to home</Anchor>
                    <Title>
                        {blog?.title}
                    </Title>
                    <Text size="sm" mt="xs" opacity={.6}>
                        By {contributors}
                    </Text>
                    <Divider my="md" />
                    <Text size="md" mt="xs" fw={500}>
                        {blog?.intro}
                    </Text>
                    {blog?.imageURL != '' && (<Image
                        my="16"
                        radius="md"
                        mah="20rem"
                        src={blog?.imageURL}
                    />)}
                    <BlogText text={blogText} />
                </Container>
            <FooterSocial/>
        </>
    );
}