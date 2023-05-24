import React, { useState, useEffect } from "react";
import moment from "moment";
import parse from "html-react-parser";

const Comments = ({ comments }) => {
  console.log(comments[0]);
  return (
    <>
      {comments.length > 0 && (
        <div className="ring-2 bg-white mb-5 py-4">
          <button>Most Relevant</button>
          <hr />
          {comments.map((comment) => (
            <div
              key={comment.createdAt}
              className="ring-1 border-b border-gray-100 py-6"
            >
              {/* top */}
              <div></div>

              <p className="mb-2 text-gray-700">
                <span className="font-semibold text-gray-900">
                  {comment.name}
                </span>{" "}
                on {moment(comment.createdAt).format("MMM DD, YYYY")}
              </p>

              <p className="whitepspace-pre-line text-gray-900 w-full">
                {parse(comment.comment)}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Comments;
