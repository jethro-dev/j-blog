import React from "react";
import { getPostDetails } from "../services";
import moment from "moment";
const PostDetail = ({ post }) => {
  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>;
      }

      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>;
      }

      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>;
      }
    }

    switch (type) {
      case "heading-three":
        return (
          <h3 key={index} className="text-xl font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        );
      case "paragraph":
        return (
          <p key={index} className="mb-8">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </p>
        );
      case "heading-four":
        return (
          <h4 key={index} className="text-md font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h4>
        );
      case "image":
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        );
      default:
        return modifiedText;
    }
  };

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

          <h1 className="font-bold text-3xl ">{post.title}</h1>

          {/* author and date*/}
          <div className="flex flex-col items-start gap-2 ">
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
          </div>
        </div>

        {/* post text */}
        <div>
          {post.content.raw.children.map((typeObj, index) => {
            const children = typeObj.children.map((item, itemIndex) =>
              getContentFragment(itemIndex, item.text, item)
            );
            return getContentFragment(index, children, typeObj, typeObj.type);
          })}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
