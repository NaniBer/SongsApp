import { SignIn, useUser } from "@clerk/clerk-react";
import { Email } from "@mui/icons-material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setUser } from "../store/slice/userSlice";
import { useDispatch } from "react-redux";
interface User {
  clerkId: any;
  firstName: string;
  lastName: string;
  email: string;
}
const RegisterToDatabase = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const { user } = useUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const newUser: User = {
        clerkId: user.id,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.primaryEmailAddress?.emailAddress || "",
      };

      if (newUser) {
        handleSuccessfulSignup(newUser);
      }
    }
  }, [user]);
  const handleSuccessfulSignup = async (newUser: User) => {
    console.log("User has successfully signed up!");
    console.log(newUser.clerkId);
    try {
      const response = await fetch(`${backendUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clerkId: newUser.clerkId,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
        }),
      });
      if (response.status == 201) {
        dispatch(setUser(newUser));

        navigate("/dashboard");
      }
      if (!response.ok) {
        throw new Error("Failed to register user on backend");
      }
      const data = await response.json();
      console.log("Backend response:", data);
    } catch (error) {
      console.error("Error during backend call:", error);
    }
  };

  return (
    <div className="flex items-center justify-center bg-custom-image bg-cover bg-center h-screen relative py-10">
      <div className="w-[1200px] h-[670px] bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl shadow-lg">
        <div className="flex flex-col md:flex-row items-start h-full">
          <div className="flex-grow h-full">
            <div className="w-full h-full bg-opacity-60 rounded-lg overflow-auto flex items-center justify-center">
              <p>Lets us save you into our database</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterToDatabase;
