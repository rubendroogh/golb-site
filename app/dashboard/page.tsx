'use client'

import { AuthContext } from "@/components/AuthProvider/AuthProvider";
import { HeaderNavigation } from "@/components/HeaderNavigation/HeaderNavigation";
import { Badge, Button, Card, Container, Group, Title, Image, Text, Grid } from "@mantine/core";
import { useContext } from "react";

import Login from "@/app/login/page";

export default function Dashboard() {
  var loggedIn = useContext(AuthContext);

  return (
    <>
      <HeaderNavigation logoVariant="compact" />
      {!loggedIn ? (<Login />) : (<Container>
          <Title order={2}>
            Welcome to the Golb Games Dashboard!
          </Title>
          <Text size="sm" c="dimmed" mb={15}>
            Here you can create, edit, or delete blogs.
          </Text>
          <Grid>
            <Grid.Col span={6}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section>
                  <Image
                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                    height={160}
                    alt="Norway"
                  />
                </Card.Section>

                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>Norway Fjord Adventures</Text>
                  <Badge color="pink">On Sale</Badge>
                </Group>

                <Text size="sm" c="dimmed">
                  With Fjord Tours you can explore more of the magical fjord landscapes with tours and
                  activities on and around the fjords of Norway
                </Text>

                <Button color="blue" fullWidth mt="md" radius="md">
                  Book classic tour now
                </Button>
              </Card>
            </Grid.Col>
            <Grid.Col span={6}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section>
                  <Image
                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                    height={160}
                    alt="Norway"
                  />
                </Card.Section>

                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>Norway Fjord Adventures</Text>
                  <Badge color="pink">On Sale</Badge>
                </Group>

                <Text size="sm" c="dimmed">
                  With Fjord Tours you can explore more of the magical fjord landscapes with tours and
                  activities on and around the fjords of Norway
                </Text>

                <Button color="blue" fullWidth mt="md" radius="md">
                  Book classic tour now
                </Button>
              </Card>
            </Grid.Col>
            <Grid.Col span={6}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section>
                  <Image
                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                    height={160}
                    alt="Norway"
                  />
                </Card.Section>

                <Group justify="space-between" mt="md" mb="xs">
                  <Text fw={500}>Norway Fjord Adventures</Text>
                  <Badge color="pink">On Sale</Badge>
                </Group>

                <Text size="sm" c="dimmed">
                  With Fjord Tours you can explore more of the magical fjord landscapes with tours and
                  activities on and around the fjords of Norway
                </Text>

                <Button color="blue" fullWidth mt="md" radius="md">
                  Book classic tour now
                </Button>
              </Card>
            </Grid.Col>
            <Grid.Col span={6}>
              <Card shadow="sm" padding="lg" radius="md" withBorder >
                <Text size="sm" c="dimmed">
                  +
                </Text>
              </Card>
            </Grid.Col>
          </Grid>
      </Container>)}
    </>
  );
}
