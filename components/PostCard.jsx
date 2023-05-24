import React from "react";
import moment from "moment";
import Link from "next/link";

const PostCard = ({ post }) => {
  return (
    <Link href={`/post/${post.slug}`}>
      <div className="group hover:bg-neutral-100 h-[230px] bg-white mb-4 last:mb-0 transition-colors hover:cursor-pointer grid grid-cols-12">
        {/* left */}
        <div className="relative col-span-7 p-4">
          <div className="flex items-center gap-2 mb-2">
            <img
              className="inline-block h-8 w-8 object-cover rounded-full"
              src={post.author.photo.url}
              alt={post.author.name}
            />
            <span className="font-medium text-sm">{post.author.name}</span>
          </div>
          <h3 className="text-lg font-semibold group-hover:underline mb-2">
            {post.title}
          </h3>
          {/* excerpt */}
          <p className="text-xs font-light">{post.excerpt}</p>
          {/* bottom bar */}
          <div className="absolute bottom-0 left-0 font-light text-xs p-4">
            <span>{moment(post.createdAt).fromNow()}</span>
            {" · "}
            <span>5 min read</span>
            {" · "}
            <span>Leadership</span>
          </div>
        </div>

        {/* right */}
        <div className="col-span-5 p-4">
          <img
            className="inline-block object-contain w-full h-full"
            src={post.featuredImage.url}
            alt={post.title}
          />
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
