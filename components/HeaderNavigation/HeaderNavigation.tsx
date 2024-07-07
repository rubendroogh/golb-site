import {
  Container,
  Group,
  Image,
} from '@mantine/core';
import classes from './HeaderNavigation.module.css';

export function HeaderNavigation({ logoVariant: logoVariant = "default"}) {
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
        </Group>
      </Container>
      
      {/* {loggedIn &&
        <Container className={classes.mainSection} size="md">
          <Group justify="space-around">
            <Anchor onClick={() => auth.signOut()}>
              Logout
            </Anchor>
          </Group>
        </Container>
      } */}
      
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