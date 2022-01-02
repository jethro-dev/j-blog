import React, { useState, useEffect } from "react";
import moment from "moment";
import parse from "html-react-parser";
import { getComments } from "../services";

const Comments = ({ slug }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments(slug).then((result) => setComments(result));
  }, []);

  return (
    <>
      {comments.length > 0 && (
        <div className="bg-white mb-5 rounded-lg px-5 py-4 shadow-md">
          <h3 className="text-lg font-medium border-b mb-4 pb-2">
            {comments.length} comments
          </h3>
          {comments.map((comment) => (
            <div
              key={comment.createdAt}
              className="border-b border-gray-100 mb-3 pb-3"
            >
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
