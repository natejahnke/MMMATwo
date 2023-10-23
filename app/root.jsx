import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import tailwindstyles from "./tailwind.css";
import BottomNavbar from "~/components/BottomNavbar";

export let links = () => {
  return [{ rel: "stylesheet", href: tailwindstyles }];
};

export const loader = () => {
  return {
    env: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_KEY: process.env.SUPABASE_KEY,
    },
  };
};

export function Layout({ children }) {
  return (
    /* 
    It is possible to define the Default Layout here. 
    In that way, all the pages are going to be in the same format.
    Examples of components to be added here: Toolbar/Navbar, Footer and etc...
    */
    <>
      <BottomNavbar  />
      {children}
    </>
  );
}

export default function App() {
  const { env } = useLoaderData();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="w-full h-full mx-auto my-auto bg-primary flex justify-center items-center">
        <div className="w-[375px]  flex flex-col relative">
          {/* <div className="overflow-y-auto flex-grow mb-5">  */}
          <Layout>
            <Outlet />

            {/* </div> */}
          </Layout>
        </div>

        <script
          dangerouslySetInnerHTML={{
            __html: `window.env = ${JSON.stringify(env)}`,
          }}
        />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
