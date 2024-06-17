import { HeaderNavigation } from "@/components/HeaderNavigation/HeaderNavigation";
import { Title } from "@mantine/core";

export default function Dashboard() {
  return (
    <>
        <HeaderNavigation logoVariant="compact" />
        <Title order={1}>
            Welcome to the Golb Games Dashboard!
        </Title>
    </>
  );
}
