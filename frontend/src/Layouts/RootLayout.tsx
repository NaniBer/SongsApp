import { Link, Outlet, useNavigate } from "react-router-dom";

const PUBLISHABLE_KEY = process.env.REACT_APP_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function RootLayout() {
  const navigate = useNavigate();

  return (
    <>
      <header className="header">
        <div></div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
