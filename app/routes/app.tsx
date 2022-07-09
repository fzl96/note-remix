import { useState } from "react";
import { Outlet } from "@remix-run/react";
import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const App = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const matches = useMediaQuery("(max-width: 768px)", false);

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[7]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
          styles={{
            root: {
              background:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
              border: "none",
            },
          }}
        >
          <Text>Application navbar</Text>
        </Navbar>
      }
      header={
        matches ? (
          <Header height={70} p="md">
            <div
              style={{ display: "flex", alignItems: "center", height: "100%" }}
            >
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>
              <Text>Application header</Text>
            </div>
          </Header>
        ) : (
          <></>
        )
      }
    >
      <Outlet />
    </AppShell>
  );
};

export default App;
