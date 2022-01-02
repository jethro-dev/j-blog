import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import { getCategories } from "../services";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((result) => setCategories(result));
    console.log(categories);
  }, []);

  return (
    <div className="bg-white rounded-lg py-4 px-5 shadow-md">
      <h3 className="text-lg font-medium border-b mb-3 pb-2">Categories</h3>
      {categories.map((category, index) => (
        <Link key={index} href={`/category/${category.slug}`}>
          <a
            className={`cursor-pointer block py-4 px-2 rounded-lg hover:bg-gray-200`}
          >
            {category.name}
          </a>
        </Link>
      ))}
    </div>
  );
};

export default Categories;

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';

// import { getCategories } from '../services';

// const Categories = () => {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     getCategories().then((newCategories) => {
//       setCategories(newCategories);
//     });
//   }, []);

//   return (
//     <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
//       <h3 className="text-xl mb-8 font-semibold border-b pb-4">Categories</h3>
//       {categories.map((category, index) => (
//         <Link key={index} href={`/category/${category.slug}`}>
//           <span className={`cursor-pointer block ${(index === categories.length - 1) ? 'border-b-0' : 'border-b'} pb-3 mb-3`}>{category.name}</span>
//         </Link>
//       ))}
//     </div>
//   );
// };

// export default Categories;
