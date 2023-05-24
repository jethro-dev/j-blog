import React from "react";

const RegisterPage = () => {
  return (
    <section className="h-screen ring-inset grid place-items-center bg-neutral-50">
      <form className="ring-1 max-w-3xl mx-auto shadow-lg ring-neutral-100 p-20 h-[678px] bg-white">
        {/* logo div */}
        <div className="grid place-items-center pb-10 select-none">
          <h1>Create an account to write a response.</h1>
          <p>
            Build on this story’s ideas with your own – responses keep the
            conversation moving.
          </p>
        </div>

        <div className="relative overflow-hidden">
          {/* translate here */}
          <div className={`flex gap-1 transition-all duration-300 ease-in-out`}>
            {/* first page */}
            <div className="w-full shrink-0 px-1">
              {/* input div */}
              <div className="flex flex-col space-y-2.5">
                <label>
                  <input
                    className="text-sm font-normal w-full bg-white ring-inset ring-1 ring-neutral-300 px-3 py-2.5 outline-none focus:ring-inset focus:ring-neutral-300 focus:ring-2 border-none rounded-md"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <label>
                  <input
                    className="text-sm font-normal w-full bg-white ring-1 ring-inset ring-neutral-300 px-3 py-2.5 outline-none border-none focus:ring-inset focus:ring-neutral-300 focus:ring-2 rounded-md"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
                <button
                  className="w-full bg-violet-500 hover:bg-violet-600 transition-colors text-white px-3 py-2 rounded-md font-medium"
                  type="button"
                  onClick={(e) => handlePasswordlessSignin(e)}
                >
                  Sign In
                </button>

                {/* sign up */}
                <div className="pt-1 text-center text-sm">
                  <span className="text-accent-7">
                    Don&apos;t have an account?
                  </span>{" "}
                  <a className="text-accent-9 font-bold hover:underline cursor-pointer">
                    Sign Up
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default RegisterPage;
