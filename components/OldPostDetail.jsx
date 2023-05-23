import React, { useEffect } from "react";
import { getPostDetails } from "../services";
import moment from "moment";

import ReactMarkdown from "react-markdown";

const PostDetail = ({ post }) => {
  console.log(post.content.markdown);

  return (
    <div className="bg-white mb-5 rounded-lg">
      {/* image */}
      <div className="max-h-[500px]">
        <img
          src={post.featuredImage.url}
          className="rounded-t-lg object-cover object-center w-full h-full"
        />
      </div>
      {/* content */}
      <div className=" p-5 lg:p-6">
        {/* post header*/}
        <div className="flex justify-between flex-col lg:flex-row items-start lg:items-end mb-5 lg:mb-12 gap-4">
          {/* post title */}

          <h1 className="font-bold text-4xl ">{post.title}</h1>

          {/* author and date*/}
          {/* <div className="flex flex-col items-start gap-2 ">
            <div>
              <span className="text-sm">Post Date: </span>
              <span className="font-medium text-sm">
                {moment(post.createdAt).format("MMM DD YYYY")}
              </span>
            </div>
            <div className="flex justify-end items-center">
              <img
                src={post.author.photo.url}
                alt={post.author.name}
                className="rounded-full object-cover h-10 w-10 inline"
              />
              <span className="pl-2">{post.author.name}</span>
            </div>
          </div> */}
        </div>

        {/* post text */}
        <div>
          <ReactMarkdown className="post__content prose">
            {post.content.markdown}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
