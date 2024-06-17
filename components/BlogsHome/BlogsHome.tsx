import { Title, Container, Divider, Grid, GridCol, SimpleGrid, Skeleton, rem } from '@mantine/core';
import classes from './BlogsHome.module.css';

const PRIMARY_COL_HEIGHT = rem(500);

export function BlogsHome() {
    const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

    return (
        <div className={classes.container}>
            <Title order={2} ta="center" mt="xl" pt="md" my="md">
                What we are doing now
            </Title>
            <Divider mx="auto" w="80%" mb="md" />
            <Container my="md" pb="md">
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                    <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={true} />
                    <Grid gutter="md">
                        <GridCol>
                            <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={true} />
                        </GridCol>
                        <GridCol span={6}>
                            <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={true} />
                        </GridCol>
                        <GridCol span={6}>
                            <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={true} />
                        </GridCol>
                    </Grid>
                </SimpleGrid>
            </Container>
        </div>
    );
}
