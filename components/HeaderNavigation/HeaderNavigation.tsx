'use client'

import {
  Container,
  Group,
  Burger,
  Image,
  Anchor,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './HeaderNavigation.module.css';
import { useContext } from 'react';
import { AuthContext } from '@/components/AuthProvider/AuthProvider';
import { auth } from '@/firebase/clientApp';

const tabs = [
  'Home',
  'Blog',
];

export function HeaderNavigation({ logoVariant: logoVariant = "default"}) {
  const [opened, { toggle }] = useDisclosure(false);
  const loggedIn = useContext(AuthContext);

  const logo = logoVariant === "default" ? <Image
                                              src="/GolbLogo.gif"
                                              w="auto"
                                              fit="contain"
                                              style={{ height: "10rem" }}
                                              flex={1} /> :
                                            <Image
                                              src="/GolbLogo.gif"
                                              w="auto"
                                              fit="contain"
                                              style={{ height: "5rem", marginBottom: "-1rem", marginTop: "-.5rem" }}
                                              flex={1} />;

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection} size="md">
        <Group justify="space-around">
          {logo}
          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
        </Group>
      </Container>
      
      {loggedIn &&
        <Container className={classes.mainSection} size="md">
          <Group justify="space-around">
            <Anchor onClick={() => auth.signOut()}>
              Logout
            </Anchor>
          </Group>
        </Container>
      }
      
      {/* <Container size="md">
        <Tabs
          defaultValue="Home"
          variant="outline"
          visibleFrom="sm"
          classNames={{
            root: classes.tabs,
            list: classes.tabsList,
            tab: classes.tab,
          }}
        >
          <Tabs.List>{items}</Tabs.List>
        </Tabs>
      </Container> */}
    </div>
  );
}