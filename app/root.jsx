import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
  useNavigation,
} from "@remix-run/react";
import tailwindstyles from "./tailwind.css";
import BottomNavbar from "~/components/BottomNavbar";
import { motion } from 'framer-motion';

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



export default function App() {
  const { env } = useLoaderData();
  const navigation = useNavigation();
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
          
          <div
          className={
            navigation.state === "loading" ? "loading" : ""
          }
          id="detail"
        ></div>
        <BottomNavbar />
            <Outlet />

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
