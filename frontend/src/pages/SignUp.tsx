import { SignUp as ClerkSignUp, useUser, useSignUp } from "@clerk/clerk-react";
import { useEffect } from "react";

// const signUpUrl = process.env.REACT_APP_CLERK_SIGN_UP_URL;
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const SignUp = () => {
  const { user } = useUser();
  console.log(user);
  const { isLoaded, signUp } = useSignUp();
  console.log(signUp);
  useEffect(() => {
    console.log(isLoaded);
    console.log(signUp?.status);

    if (isLoaded && signUp.status == "missing_requirements") {
      handleSuccessfulSignup();
    }
  }, [isLoaded, signUp?.status]);

  const handleSuccessfulSignup = async () => {
    console.log("User has suc.cessfully signed up!");

    try {
      const response = await fetch(`${backendUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clerkId: signUp?.createdUserId,
          firstName: signUp?.firstName,
          lastName: signUp?.firstName,
          email: signUp?.emailAddress,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to register user on backend");
      }

      const data = await response.json();
      console.log("Backend response:", data);
    } catch (error) {
      console.error("Error during backend call:", error);
    }
  };
  useEffect(() => {
    console.log(user?.firstName);
    if (user) {
      const firstName = user.firstName || "Unknown";
      const lastName = user.lastName || "Unknown";
      const iduser = user.id || "unkwonn";
      const id = user;

      console.log(id);
      //   const email = user.emailAddresses || "Unknown";
      sessionStorage.setItem("firstName", firstName);
      sessionStorage.setItem("lastName", lastName);
      sessionStorage.setItem("useer", iduser);
      //   sessionStorage.setItem("Email",email)

      console.log("User information saved in session storage");
    }
  }, [user]);
  return (
    <div className="flex items-center justify-center bg-custom-image bg-cover bg-center h-screen relative py-10">
      <div className="w-[1000px] h-[760px] bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl shadow-lg">
        <div className="flex flex-col md:flex-row items-start h-full">
          <div className="flex-grow h-full">
            <div className="w-full h-full bg-opacity-60 rounded-lg overflow-auto flex items-center justify-center">
              <ClerkSignUp
                signInUrl="/login"
                fallbackRedirectUrl="/RegisterToDatabase"
              />
              {/* <button onClick={handleSuccessfulSignup}>clickMe</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
