'use client'

import Blog from '@/interfaces/Blog';
import classes from './BlogCardHome.module.css';
import { Text, BackgroundImage, Box, Overlay, Flex, Title, Anchor } from '@mantine/core';

export function BlogCardHome(props: { blog: Blog, height: number | string, maxIntroLength: number }) {
    if (props.blog == undefined) {
        return <></>
    }

    return (
        <Box className={classes['blog-container']} pos='relative' mx="auto" h={props.height} w='100%'>
            <Anchor href={`/blog/${props.blog.slug}`}>
                <Overlay gradient="linear-gradient(0deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0) 100%)" backgroundOpacity={0.85} radius="md" />
                <BackgroundImage
                    h={props.height}
                    w='100%'
                    src={props.blog.imageURL}
                    radius="md"
                >
                    <Flex p={30} ta='right' direction='column' justify='end' h='100%' style={{zIndex: 201}} pos='relative'>
                        <Title order={3} mt="xl" pt="md">
                            {props.blog.title}
                        </Title>
                        <Text c="white">
                            {props.blog.intro.substring(0, props.maxIntroLength)}{(props.blog.intro.length > props.maxIntroLength && props.maxIntroLength != 0) ? '...' : ''}
                        </Text>
                    </Flex>
                </BackgroundImage>
            </Anchor>
        </Box>
    );
}
