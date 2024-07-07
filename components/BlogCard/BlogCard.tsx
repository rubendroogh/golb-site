import Blog from '@/interfaces/Blog';
import { Title, Container, Divider, Grid, GridCol, SimpleGrid, Skeleton, rem, Badge, Button, Card, Group, Image, Text } from '@mantine/core';

export function BlogCard(props: {blog: Blog}) {

    return (
        <Grid.Col span={6}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section>
                    <Image
                    src={props.blog.imageURL}
                    height={160}
                    />
                </Card.Section>

                <Group justify="space-between" mt="md" mb="xs">
                    <Text fw={500}>{props.blog.title}</Text>
                </Group>

                <Text size="sm" c="dimmed">
                    {props.blog.intro}
                </Text>

                <Button color="blue" fullWidth mt="md" radius="md">
                    Edit
                </Button>
            </Card>
        </Grid.Col>
    );
}
