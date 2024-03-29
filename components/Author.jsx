import React from "react";
import Link from "next/link";
import Image from "next/image";

const Author = ({ author }) => {
  return (
    <div className="bg-white mb-5 rounded-lg py-4 px-5 shadow-md">
      <h3 className="text-lg font-medium border-b mb-4 pb-2">Author</h3>
      <div className="flex items-center gap-5 md:flex-col">
        <div className="relative h-20 w-20">
          <Image
            src={author.photo.url}
            alt={author.name}
            className="rounded-full object-cover ring-1 ring-white"
            layout="fill"
          />
        </div>
        <div className="flex flex-col gap-1 md:text-center">
          <div>
            <span className="font-bold text-xl">{author.name}</span>
          </div>
          <p className="font-medium text-md">{author.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default Author;
