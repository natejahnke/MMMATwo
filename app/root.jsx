import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation
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

export function Layout({ children }) {
  const location = useLocation();

  // Framer Motion Variants
  const swipeVariants = {
    initial: { x: 400, opacity: 0 },
    in: { 
      x: [400, 20, 0],  // keyframes: start at 400, bounce to 20, settle at 0
      opacity: [0, 1, 1]
    },
    out: { x: -400, opacity: 0 }
  };
  return (
    /* 
    It is possible to define the Default Layout here. 
    In that way, all the pages are going to be in the same format.
    Examples of components to be added here: Toolbar/Navbar, Footer and etc...
    */
    <>
      <BottomNavbar />
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={swipeVariants}
        transition={{
          x: { type: "spring", stiffness: 300, damping: 20, times: [0, 0.8, 1] },
          opacity: { duration: 1 }
        }}
        key={location.pathname}
      >
        <Outlet />
      </motion.div>
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
