import React, { useState, useEffect } from "react";
import moment from "moment";
import Link from "next/link";
import { getRecentPosts, getSimilarPosts } from "../services";

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) =>
        setRelatedPosts(result)
      );
    } else {
      getRecentPosts().then((result) =>
        setRelatedPosts(
          result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        )
      );
    }
  }, [slug]);

  return (
    <div className="bg-white mb-5 rounded-lg py-4 px-5 shadow-md">
      <h3 className="text-lg font-medium border-b mb-4 pb-2">
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>
      {relatedPosts.map((post) => (
        <Link href={`/post/${post.slug}`}>
          <div
            key={post.title}
            className="block sm:flex items-center gap-4 mb-1 p-2 pb-4 rounded-md cursor-pointer hover:bg-gray-200 transition-colors duration-300"
          >
            <div className="flex-1 mb-5 md:mb-0">
              <img
                src={post.featuredImage.url}
                alt={post.title}
                className="w-full object-cover rounded-md ring-1 ring-gray-300"
              />
            </div>
            <div className="flex-1">
              <h5 className="text-md md:text-sm font-semibold mb-2 md:mb-1 md:max-w-[100px]">
                {post.title}
              </h5>
              <p className="text-xs font-thin">
                {moment(post.createdAt).fromNow()}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostWidget;
