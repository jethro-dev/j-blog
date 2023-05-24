import React from "react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

const TrendingPostCard = ({ index, post }) => (
  <Link href={`/post/${post.slug}`}>
    <div className="group relative w-full h-[150px] bg-white hover:bg-neutral-100 text-black transition-colors hover:cursor-pointer flex py-4">
      {/* left */}
      <div className="w-[60px] text-center">
        <span className="text-3xl font-bold text-neutral-300 group-hover:text-neutral-400 transition-colors duration-300 ease-in-out">
          0{index + 1}
        </span>
      </div>

      {/* right */}
      <div className="flex-1 relative">
        {/* topline */}
        <div className="mb-2 text-sm font-medium">
          <h4>{post.author.name}</h4>
        </div>

        {/* title */}
        <div className="mb-4">
          <h3 className="text-base font-bold group-hover:underline">
            {post.title}
          </h3>
        </div>
        {/* bottom bar */}
        <div className="absolute bottom-0 left-0 flex items-center gap-2 text-xs text-neutral-400 ">
          <span>{moment(post.createdAt).format("MMM DD, YYYY")}</span>
          {" · "}
          <span>7 min read</span>
        </div>
      </div>
    </div>
  </Link>
);

export default TrendingPostCard;
