'use client'

import Blog from '@/interfaces/Blog';
import { Grid, Button, Card, Group, Image, Text, Flex, Overlay } from '@mantine/core';
import { IconEditCircle, IconTrash, IconWand } from '@tabler/icons-react';

import { db } from '@/firebase/clientApp';
import { deleteDoc, doc, setDoc } from "firebase/firestore"; 
import { useState } from 'react';

export function BlogCard(props: {blog: Blog}) {
    const [isDeleted, setIsDeleted] = useState(false);

    const deleteBlog = async () => {
        await deleteDoc(doc(db, "blogs", props.blog.slug));
        setIsDeleted(true);
    }

    const unDeleteBlog = async () => {
        await setDoc(doc(db, "blogs", props.blog.slug), props.blog);
        setIsDeleted(false);
    }

    return (
        <Grid.Col span={6}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                {isDeleted &&
                    <>
                        <Overlay color="#000" backgroundOpacity={0.35} blur={15} zIndex={10} />
                        <Flex top={0} left={0} p={60} justify="center" align="center" direction="column" h='100%' pos='absolute' style={{zIndex: 11}}>
                            <Text ta={'center'}>This blog has been deleted. Refreshing the page will delete this blog forever. Alternatively, you can undelete it.</Text>
                            <Button color='green' mt={30} leftSection={<IconWand size={14} />} onClick={unDeleteBlog}>Undelete</Button>
                        </Flex>
                    </>
                }

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
                    {props.blog.intro.substring(0, 120)}{props.blog.intro.length > 120 ? '...' : ''}
                </Text>

                <Flex
                    gap="md"
                    justify="space-between"
                    align="flex-start"
                    direction="row">
                    <Button
                        color="blue"
                        mt="md"
                        radius="md"
                        onClick={() => window.location.href = `/dashboard/blog/${props.blog.slug}`}
                        rightSection={<IconEditCircle size={14} />}>
                        Edit
                    </Button>
                    <Button
                        color="red"
                        mt="md"
                        radius="md"
                        onClick={deleteBlog}
                        rightSection={<IconTrash size={14} />}>
                        Delete
                    </Button>
                </Flex>
            </Card>
        </Grid.Col>
    );
}
