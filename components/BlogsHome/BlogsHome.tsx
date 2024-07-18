import { Title, Container, Divider, Grid, GridCol, SimpleGrid, Skeleton, rem } from '@mantine/core';
import classes from './BlogsHome.module.css';
import { BlogCardHome } from '../BlogCardHome/BlogCardHome';
import { db } from '@/firebase/adminApp';
import { blogConverterServer } from '@/interfaces/Blog';

const PRIMARY_COL_HEIGHT = rem(600);

export async function BlogsHome() {
    const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;
    const blogsCollection = db.collection("blogs").withConverter(blogConverterServer);
    const blogs = (await blogsCollection.get()).docs.map(doc => doc.data());

    return (
        <div className={classes.container}>
            <Title order={2} ta="center" mt="xl" pt="md" my="md">
                What we are doing now
            </Title>
            <Divider mx="auto" w="80%" mb="md" />
            <Container my="md" pb="md">
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                    <BlogCardHome blog={blogs[0]} height={PRIMARY_COL_HEIGHT} maxIntroLength={160} /> 
                    <Grid gutter="md">
                        <GridCol>
                            <BlogCardHome blog={blogs[1]} height={SECONDARY_COL_HEIGHT} maxIntroLength={90} /> 
                        </GridCol>
                        <GridCol span={6}>
                            <BlogCardHome blog={blogs[2]} height={SECONDARY_COL_HEIGHT} maxIntroLength={50} /> 
                        </GridCol>
                        <GridCol span={6}>
                            <BlogCardHome blog={blogs[3]} height={SECONDARY_COL_HEIGHT} maxIntroLength={0} /> 
                        </GridCol>
                    </Grid>
                </SimpleGrid>
            </Container>
        </div>
    );
}
