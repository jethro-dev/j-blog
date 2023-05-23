import React from "react";
import PostGridCard from "./PostGridCard";

const RelatedPostGrid = ({ posts }) => {
  return (
    <div className="bg-transparent mb-5 py-4 px-5">
      <h3 className="text-2xl font-semibold mb-4">Related posts</h3>

      <div className="grid grid-cols-2">
        {posts.map((post) => (
          <PostGridCard key={post.id} post={post} />
        ))}
        {/* {posts.map((post) => (
          <PostGridCard key={post.id} post={post} />
        ))} */}
      </div>
    </div>
  );
};

export default RelatedPostGrid;
