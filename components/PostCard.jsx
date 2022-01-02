import React from "react";
import moment from "moment";
import Link from "next/link";

const PostCard = ({ post }) => {
  return (
    <div className="bg-white shadow-md mb-5 last:mb-0 rounded-lg">
      {/* image */}
      <div className="h-[400px] mb-8">
        <img
          src={post.featuredImage.url}
          alt={post.title}
          className="object-center h-full w-full object-cover shadow-lg rounded-t-lg"
        />
      </div>
      {/* content */}
      <div className="p-5">
        {/* title */}
        <div className="grid place-items-center md:place-items-start mb-5">
          <Link href={`/post/${post.slug}`}>
            <span className="font-bold  cursor-pointer hover:text-blue-500 text-xl transition-colors duration-300 ">
              {post.title}
            </span>
          </Link>
        </div>

        {/* detail */}
        <div className="flex items-center justify-center gap-5 mb-5 md:flex-col md:items-start md:gap-2">
          {/* author */}
          <div className="flex items-center justify-center gap-2">
            <img
              className="inline-block h-8 w-8 object-cover rounded-full ring-2 ring-white"
              src={post.author.photo.url}
              alt={post.author.name}
            />
            <span className="font-medium text-sm">{post.author.name}</span>
          </div>

          {/* date */}
          <div>
            <span className="font-medium text-xs">
              {moment(post.createdAt).fromNow()}
            </span>
          </div>
        </div>

        {/* desc */}
        <p className="text-center md:text-left max-w-[700px] mx-auto md:mx-0 mb-5">
          {post.excerpt}
        </p>

        {/* Read more Btn */}
        <div className="flex justify-center items-center">
          <Link href={`/post/${post.slug}`}>
            <button className="rounded-lg px-3 py-2 text-gray-700 font-medium bg-zinc-100 hover:bg-zinc-300 hover:text-gray-900 transition duration-300 dark:hover:bg-zinc-100 dark:text-gray-500 hover:-translate-y-1 hover:ring-1 ring-blue-800">
              Read more...
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
