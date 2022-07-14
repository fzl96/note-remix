import { Outlet, useLoaderData } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/node";
// import AppLayout from "~/components/AppLayout";
import { requireUserId } from "~/utils/auth.server";
import type { NoteType } from "~/utils/types.server";
import { useEffect, useState } from "react";
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
import { Link, useLocation } from "@remix-run/react";


export let loader: LoaderFunction = async ({request}) => {
  await requireUserId(request);
  const res = await fetch("https://dummyjson.com/posts");
  const notes = await res.json();
  return notes.posts;
};

const App = () => {
  const notes = useLoaderData<NoteType[]>();

  return (
    <AppLayout>
      <Outlet context={notes} />
    </AppLayout>
  );
};

const AppLayout = ({ children }: any) => {
  const [opened, setOpened] = useState(false);
  const {pathname} = useLocation()
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const matches = useMediaQuery("(max-width: 768px)", false);

  useEffect(() => {
    setOpened(false); // Close the navigation panel
  }, [ pathname ]);

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
                <Link to="/app/todos">
                  <li className="p-3 hover:bg-grayish rounded-lg">Todos</li>
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

export default App;
