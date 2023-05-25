import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import {
  AiOutlineGithub,
  AiOutlineGoogle,
  AiOutlineLink,
} from "react-icons/ai";
import { signIn, useSession } from "next-auth/react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const SignInPage = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isRegisterPage, setIsRegisterPage] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const [errorMessage, setErrorMessage] = useState("");

  const handlePasswordlessSignin = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      isRegister: isRegisterPage,
      callbackUrl: "/",
    });

    console.log({ result });

    if (!result.error) {
      // Redirect or perform any other necessary actions upon successful login
      router.push("/");
    } else {
      // Handle login error
      setErrorMessage(result.error);
    }
  };

  useEffect(() => {
    const timeId = setTimeout(() => {
      setErrorMessage("");
    }, 8000);

    return () => {
      clearTimeout(timeId);
    };
  }, [errorMessage]);

  // Redirect user if logged in
  if (session) {
    router.push("/");
  }

  return (
    <section className="h-screen ring-inset grid place-items-center bg-neutral-50">
      <form className="relative ring-1 max-w-2xl w-full mx-auto shadow-lg ring-neutral-100 px-20 py-28 h-full lg:h-[700px] bg-white">
        {/* back to home page btn */}
        <button type="button" className="absolute top-0 left-0 m-8">
          <Link href="/">
            <span className="flex items-center gap-2 text-neutral-800 font-normal hover:underline text-sm">
              <ArrowLeftIcon className="h-4 w-4" />
              Back to home
            </span>
          </Link>
        </button>

        <div className="grid place-items-center select-none text-center">
          <h1 className="text-3xl font-medium mb-6">
            {isRegisterPage
              ? "Create an account to write a response."
              : "Welcome back"}
          </h1>

          <p className="mb-6">
            {isRegisterPage
              ? "Build on this story’s ideas with your own – responses keep the conversation moving."
              : "Sign in to keep the conversation moving with a response."}
          </p>
        </div>

        {/* input div */}
        <div className="max-w-sm mx-auto">
          <label>
            <input
              className="text-sm font-normal w-full bg-white ring-inset ring-1 ring-neutral-300 px-3 py-2.5 outline-none focus:ring-inset focus:ring-neutral-300 focus:ring-2 border-none mb-2"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <input
              className="text-sm font-normal w-full bg-white ring-1 ring-inset ring-neutral-300 px-3 py-2.5 outline-none border-none focus:ring-inset focus:ring-neutral-300 focus:ring-2 mb-6"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {errorMessage && (
            <p className="text-red-500 text-sm mb-6">{errorMessage}</p>
          )}
          <button
            className="w-full bg-neutral-200 ring-1 ring-neutral-300 hover:bg-white transition-colors text-black px-3 py-2 font-medium mb-40"
            type="submit"
            onClick={(e) => handlePasswordlessSignin(e)}
          >
            {isRegisterPage ? "Join the club." : "Sign In"}
          </button>
        </div>

        <div className="absolute bottom-0 mb-10 left-[50%] translate-x-[-50%] text-center w-[85%]">
          {/* togggle */}
          <div className="pt-1 text-center text-sm mb-4">
            <span className="text-accent-7">
              {isRegisterPage ? "Already have an account? " : "No account? "}
            </span>
            <button
              type="button"
              className="text-accent-9 font-bold hover:underline cursor-pointer"
              onClick={() => setIsRegisterPage((prev) => !prev)}
            >
              {isRegisterPage ? "Login" : "Create one"}
            </button>
          </div>
          <p className="text-xs font-light">
            Click Sign In to agree to Terms of Service and acknowledge that
            Privacy Policy applies to you.
          </p>
        </div>
      </form>
    </section>
  );
};

export default SignInPage;
