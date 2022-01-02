import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { Switch } from ".";
import { getCategories } from "../services";

const Navbar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((result) => setCategories(result));
  }, []);

  return (
    <nav className="h-[70px] px-10 sticky top-0 bg-white dark:bg-gray-500 transition-colors shadow-sm ">
      <div className="max-w-7xl m-auto h-full flex justify-between items-center">
        <div className="">
          <Link href="/">
            <span className="cursor-pointer font-medium text-3xl text-indigo-500 dark:text-white transition-colors tracking-widest">
              JBLOG
            </span>
          </Link>
        </div>
        <div className="flex justify-between items-center gap-1">
          {categories.map(({ name, slug }) => (
            <Link key={slug} href={`/category/${slug}`}>
              <a className="rounded-lg px-3 py-2 text-zinc-500 font-medium hover:bg-gray-300 hover:text-zinc-900 transition-colors duration-300 dark:hover:bg-gray-600 dark:text-gray-100">
                {name}
              </a>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
