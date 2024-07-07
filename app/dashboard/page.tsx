'use client'

import { collection, doc, setDoc, getDocs, getDocsFromCache } from "firebase/firestore"; 
import { AuthContext } from "@/components/AuthProvider/AuthProvider";
import { HeaderNavigation } from "@/components/HeaderNavigation/HeaderNavigation";
import { Card, Container, Title, Text, Grid } from "@mantine/core";
import { useContext, useEffect, useState } from "react";

import Login from "@/app/login/page";
import { BlogCard } from "@/components/BlogCard/BlogCard";
import Blog, { blogConverter } from "@/interfaces/Blog";
import { db } from "@/firebase/clientApp";

const testBlog = {
  title: "Norway Fjord Adventures",
  intro: "Fellas",
  content: "With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around the fjords of Norway",
  imageURL: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png",
  contributors: ["Golb Games"]
} as Blog;

export default function Dashboard() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogsRef = collection(db, "blogs").withConverter(blogConverter);
        // get all blogs in an array of Blog objects
        const blogsResult = (await getDocs(blogsRef)).docs.map(doc => doc.data()) as Blog[];
        setBlogs(blogsResult);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
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
            <Grid.Col span={6}>
              <Card shadow="sm" padding="lg" radius="md" withBorder >
                <Text size="sm" c="dimmed">
                  +
                </Text>
              </Card>
            </Grid.Col>
          </Grid>
      </Container>
    </>
  );
}
