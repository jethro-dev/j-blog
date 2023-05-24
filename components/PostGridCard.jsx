import React from "react";
import Link from "next/link";
import moment from "moment";

const PostGridCard = ({ post }) => {
  console.log(post);
  return (
    <Link href={`/post/${post.slug}`} key={post.slug} className="col-span-1">
      <div className="group bg-neutral-100 hover:bg-white cursor-pointer transition-colors duration-300 ">
        <div className="h-[200px]">
          <img
            src={post.featuredImage.url}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h5 className="text-md md:text-sm font-semibold mb-2 group-hover:underline">
            {post.title}
          </h5>
          <p className="text-xs font-normal mb-2">{post.excerpt}</p>
          <p className="text-xs font-thin">
            {moment(post.createdAt).format("MMM D, YYYY")}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PostGridCard;
