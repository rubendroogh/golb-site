import { HeaderNavigation } from "@/components/HeaderNavigation/HeaderNavigation";
import { Container, Title, Text, Grid, Button } from "@mantine/core";

import { BlogCard } from "@/components/BlogCard/BlogCard";
import { blogConverterServer } from "@/interfaces/Blog";
import { db } from "@/firebase/adminApp";
import { IconMacro } from "@tabler/icons-react";

export default async function Dashboard() {
  const blogsCollection = db.collection("blogs").withConverter(blogConverterServer);
  const blogs = (await blogsCollection.get()).docs.map(doc => doc.data());
  
  return (
    <>
      <HeaderNavigation logoVariant="compact" />
      <Container>
          <Title order={2}>
            Welcome to the Golb Games Dashboard!
          </Title>
          <Text size="sm" c="dimmed" mb={15}>
            Here you can create, edit, or delete blogs.
          </Text>
          <Grid>
            {blogs.map(blog => <BlogCard blog={blog} />)}
            <Button m={8} color="green" leftSection={<IconMacro size={14} />} component="a" href="/dashboard/blog/create">Create new blog</Button>
          </Grid>
      </Container>
    </>
  );
}
