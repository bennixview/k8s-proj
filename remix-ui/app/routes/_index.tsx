import { json, type ActionFunctionArgs } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Hello App" },
    { name: "description", content: "A simple hello app using Remix and Krakend" },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get("name")?.toString() || "";
  if (!name) {
    return json({ error: "Name is required" });
  }
  try {
    // Using relative path to ensure it works through the gateway
    const res = await fetch(`/hello?name=${encodeURIComponent(name)}`);
    const data = await res.json();
    return json({ message: data.message });
  } catch (e) {
    console.error("Error fetching from API:", e);
    return json({ error: "Failed to fetch from API" });
  }
}

export default function Index() {
  const actionData = useActionData<typeof action>();
  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>Hello UI</h1>
      <Form method="post">
        <label>
          Enter your name:
          <input name="name" type="text" style={{ marginLeft: 8 }} />
        </label>
        <button type="submit" style={{ marginLeft: 8 }}>Say Hello</button>
      </Form>
      {actionData?.message && (
        <p style={{ marginTop: 16, color: 'green' }}>{actionData.message}</p>
      )}
      {actionData?.error && (
        <p style={{ marginTop: 16, color: 'red' }}>{actionData.error}</p>
      )}
    </div>
  );
}
