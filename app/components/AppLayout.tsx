import { useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Text,
  Burger,
  useMantineTheme,
  useMantineColorScheme,
  Switch,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const AppLayout = ({ children }: any) => {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const matches = useMediaQuery("(max-width: 768px)", false);
  return (
    <>
      <AppShell
        className="z-[-2] h-full"
        styles={{
          main: {
            background: dark ? theme.colors.dark[7] : "",
          },
        }}
        navbarOffsetBreakpoint="sm"
        fixed
        navbar={
          <Navbar
            p="md"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 200, lg: 370 }}
            styles={{
              root: {
                background: dark ? theme.colors.dark[8] : '#f6f6f6',
                border: "none",
              },
            }}
          >
            <Text className="font-encode">Application navbar</Text>
            <Switch
              color={dark ? "dark" : "dark"}
              onClick={() => toggleColorScheme()}
            />
          </Navbar>
        }
        header={
          matches ? (
            <Header height={70} p="md">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Burger
                  className="sm:block"
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
                <Text>Application header</Text>
              </div>
            </Header>
          ) : (
            <></>
          )
        }
      >
        {children}
      </AppShell>
    </>
  );
};
export default AppLayout;
