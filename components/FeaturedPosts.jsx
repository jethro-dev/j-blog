import React, { useState, useEffect } from "react";

import { getFeaturedPosts } from "../services";
import { TrendingPostCard } from "../components";

const FeaturedPosts = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    getFeaturedPosts().then((result) => {
      setFeaturedPosts(result);
      setDataLoaded(true);
    });
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {dataLoaded &&
        featuredPosts.map((post, index) => (
          <div key={post.id} className="col-span-1">
            <TrendingPostCard post={post} index={index} />
          </div>
        ))}
    </div>
  );
};

export default FeaturedPosts;
