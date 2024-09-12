// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";

// // const root = ReactDOM.createRoot(
// //   document.getElementById("root") as HTMLElement
// // );
// // root.render(
// //   <React.StrictMode>
// //     <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
// //       <App />
// //     </ClerkProvider>
// //   </React.StrictMode>
// // );

// const App = () => {
//   return (
//     <ClerkProvider
//       publishableKey={PUBLISHABLE_KEY}
//     >
//      <App/>
//     </ClerkProvider>
//   );
// };

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Import the layouts
import RootLayout from "./Layouts/RootLayout";
import DashboardLayout from "./Layouts/DashboardLayout";
import LoginPage from "./pages/LoginPage";
import { ClerkProvider } from "@clerk/clerk-react";
import SignUp from "./pages/SignUp";
import { shadesOfPurple } from "@clerk/themes";
import DashboardPage from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage";
import RegisterToDatabase from "./pages/RegisterToDatabase";
import { Provider } from "react-redux";
import { store } from "./store";
const PUBLISHABLE_KEY = process.env.REACT_APP_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <LoginPage /> },
      { path: "/signUp", element: <SignUp /> },
      { path: "RegisterToDatabase", element: <RegisterToDatabase /> },
      {
        element: <DashboardLayout />,
        path: "dashboard",
        children: [{ path: "/dashboard", element: <LandingPage /> }],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
        appearance={{
          baseTheme: [shadesOfPurple],
          variables: {
            colorPrimary: "white",
            colorBackground: "#3A2C55",
            colorInputBackground: "rgba(255, 255, 255, 0.7)",
            colorInputText: "black",
          },
        }}
        afterSignOutUrl="/"
      >
        <RouterProvider router={router} />
      </ClerkProvider>
    </Provider>
  </React.StrictMode>
);
