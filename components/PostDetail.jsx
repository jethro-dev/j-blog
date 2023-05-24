import React, { useEffect } from "react";
import { getPostDetails } from "../services";
import moment from "moment";

import ReactMarkdown from "react-markdown";
import Author from "./Author";

const PostDetail = ({ post, toggleCommentDrawer }) => {
  return (
    <div className="bg-white mb-5 rounded-lg">
      {/* post header*/}
      <div className="max-w-3xl mx-auto py-10">
        <h1 className="font-bold text-4xl mb-6">{post.title}</h1>

        <div className="flex items-center gap-4 mb-6">
          <img
            src={post.author.photo.url}
            alt={post.author.name}
            className="rounded-full object-cover h-20 w-20 ring-1 ring-white"
          />
          <div>
            <span className="font-bold text-xl">{post.author.name}</span>
            <div>
              <span>5 min read</span>
              {" · "}
              <span>{moment(post.createdAt).format("MMM D, YYYY")}</span>
            </div>
          </div>
        </div>

        {/* bottom bar */}

        <div className="flex items-center justify-between border-t-[1px] border-b-[1px] border-neutral-200 py-4 text-sm">
          <div className="flex items-center gap-2">
            <span>Like</span>
            <button type="button" onClick={toggleCommentDrawer}>
              Comment
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span>Save</span>
            <span>Listen</span>
            <span>Share</span>
          </div>
        </div>
      </div>

      {/* Banner image (required now, but make it optional in future) */}
      <div className="w-full">
        <img
          src={post.featuredImage.url}
          className="object-cover object-center w-full h-full"
        />
      </div>
      {/* post text */}
      <div className="max-w-3xl mx-auto py-10">
        <ReactMarkdown className="post__content prose max-w-none">
          {post.content.markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default PostDetail;
