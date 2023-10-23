import { json, redirect } from "@remix-run/node";

export const meta = () => {
  return [{ title: "New Remix App" }];
};

export let loader = () => {
  return redirect("/events");
};

export default function Index() {
  return null;
}
