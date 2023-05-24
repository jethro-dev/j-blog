import React, { useState, useEffect } from "react";
import Link from "next/link";

import { getCategories } from "../services";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const supports = [
    "Help",
    "Status",
    "Writers",
    "Blog",
    "Careers",
    "Privacy",
    "Terms",
    "About",
    "Text to speech",
  ];

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);

  return (
    <div className="bg-white mb-5 py-4 px-5">
      <h3 className="text-base font-medium mb-4">
        Discover more of what matters to you
      </h3>
      <div className="flex flex-wrap gap-4 mb-6">
        {categories.map((category, index) => (
          <Link key={index} href={`/`}>
            <span
              className={`cursor-pointer block py-2 px-2.5 rounded-full bg-neutral-100 text-xs font-medium text-neutral-800 hover:bg-neutral-200 transition-colors`}
            >
              {category.name}
            </span>
          </Link>
        ))}
      </div>
      <Link href={`/`}>
        <span className="text-green-500 hover:text-neutral-800 text-sm font-medium cursor-pointer transition-colors">
          See more topics
        </span>
      </Link>
      <hr className="my-10" />
      <div className="flex flex-wrap gap-4">
        {supports.map((item, idx) => (
          <span
            key={idx}
            className="text-sm text-neutral-500 hover:text-black transition-colors cursor-pointer "
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Categories;
