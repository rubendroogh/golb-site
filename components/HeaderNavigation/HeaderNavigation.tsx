import {
  Anchor,
  Container,
  Group,
  Image,
  Paper,
} from '@mantine/core';
import classes from './HeaderNavigation.module.css';

export function HeaderNavigation({ logoVariant: logoVariant = "default"}) {
  const logo = logoVariant === "default" ?
    <Image src="/GolbLogo.gif" w="auto" fit="contain" style={{ height: "10rem" }} flex={1} /> :
    <Image src="/GolbLogo.gif" w="auto" fit="contain" style={{ height: "5rem", marginBottom: "-1rem", marginTop: "-.5rem" }} flex={1} />;

  return (
    <div className={classes.header}>
      <Paper shadow="md" className={classes.mainSection} bg="#2e2e2e">
        <Group justify="space-around">
          <Anchor href='/'>
            {logo}
          </Anchor>
        </Group>
      </Paper>
    </div>
  );
}