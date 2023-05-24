import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { Switch } from ".";
import { getCategories } from "../services";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    getCategories().then((result) => setCategories(result));
  }, []);

  return (
    <nav className="h-[70px] px-10 sticky top-0 bg-white dark:bg-gray-500 transition-colors shadow-sm z-50">
      <div className="max-w-8xl m-auto h-full flex justify-between items-center">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <Link href="/">
            <span className="cursor-pointer font-medium text-3xl text-indigo-500 dark:text-white transition-colors tracking-widest">
              JBLOG
            </span>
          </Link>
          {/* Search bar */}
          <div className="bg-neutral-100 px-2.5 py-2 text-sm rounded-sm flex items-center gap-2">
            <MagnifyingGlassIcon className="h-5 w-5 text-neutral-500" />
            <input
              type="text"
              className="bg-transparent outline-none border-none ring-0"
              placeholder="Search"
            />
          </div>
        </div>
        {/* Left */}
        <div className="flex justify-between items-center gap-1">
          {/* Links */}
          {categories.map(({ name, slug }) => (
            <Link key={slug} href={`/`}>
              <a className="rounded-lg px-3 py-2 text-zinc-500 font-medium hover:bg-gray-300 hover:text-zinc-900 transition-colors duration-300 dark:hover:bg-gray-600 dark:text-gray-100">
                {name}
              </a>
            </Link>
          ))}

          {/* User */}
          {session ? (
            <p>
              <span>Signed in as {session?.user?.email}</span>
              <button onClick={signOut}>Sign out</button>
            </p>
          ) : (
            <>
              <Link href="/signin">Sign in</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
