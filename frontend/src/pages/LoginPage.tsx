import { SignIn } from "@clerk/clerk-react";
import { useEffect } from "react";

const signUpUrl = process.env.REACT_APP_CLERK_SIGN_UP_URL;

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center bg-custom-image bg-cover bg-center h-screen relative py-10">
      <div className="w-[1200px] h-[670px] bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl shadow-lg">
        <div className="flex flex-col md:flex-row items-start h-full">
          <div className="flex-grow h-full">
            <div className="w-full h-full bg-opacity-60 rounded-lg overflow-auto flex items-center justify-center">
              <SignIn signUpUrl="/signUp" fallbackRedirectUrl={"/dashboard"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
