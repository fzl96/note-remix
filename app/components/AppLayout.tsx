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
import { Link } from "@remix-run/react";

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
            background: dark ? theme.colors.dark[7] : "#f4f5f7",
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
                background: dark ? theme.colors.dark[8] : "#fff",
                border: "none",
              },
            }}
          >
            <div className="flex flex-col justify-between h-full">
              <ul className="w-full p-10">
                <Link to="/app/notes">
                  <li className="p-3 hover:bg-grayish rounded-lg">Notes</li>
                </Link>
              </ul>
              <Switch
                color={dark ? "blue" : "blue"}
                onClick={() => toggleColorScheme()}
              />
            </div>
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
