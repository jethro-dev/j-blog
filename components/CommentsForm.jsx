import React, { useRef, useState, useEffect } from "react";
import { submitComment } from "../services";

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState();
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDataEl = useRef();

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem("name");
    emailEl.current.value = window.localStorage.getItem("email");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setShowSuccessMessage(false);

    const { value: comment } = commentEl.current;
    const { value: name } = nameEl.current;
    const { value: email } = emailEl.current;
    const { checked: storeData } = storeDataEl.current;

    if (!comment || !name || !email) {
      setError(true);
      return;
    }

    const commentObj = {
      name,
      email,
      comment,
      slug,
    };

    if (storeData) {
      window.localStorage.setItem("name", name);
      window.localStorage.setItem("email", email);
    } else {
      window.localStorage.removeItem("name", name);
      window.localStorage.removeItem("email", email);
    }

    submitComment(commentObj).then((res) => {
      commentEl.current.value = "";
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
    });

    location.reload();
  };

  return (
    <div className="bg-white mb-5 rounded-lg py-4 px-5 shadow-md">
      <h3 className="text-lg font-medium border-b mb-4 pb-2">Leave a Reply</h3>
      {/* comment div*/}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <textarea
            ref={commentEl}
            cols="10"
            rows="5"
            placeholder="Comment"
            name="comment"
            className="p-4 outline-none w-full rounded-md bg-gray-100 resize-none focus:ring-2 ring-indigo-500 text-black"
          />
        </div>
        {/* name and email div */}
        <div className="grid grid-cols-1 gap-4 mb-4 lg:grid-cols-2">
          <input
            ref={nameEl}
            type="text"
            placeholder="Name"
            name="name"
            className="px-4 py-3 outline-none w-full rounded-md bg-gray-100 resize-none focus:ring-2 ring-indigo-500 text-black"
          />
          <input
            ref={emailEl}
            type="text"
            placeholder="Email"
            name="email"
            className="px-4 py-3 outline-none w-full rounded-md bg-gray-100 resize-none focus:ring-2 ring-indigo-500 text-black"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <input
                ref={storeDataEl}
                type="checkbox"
                id="storeData"
                defaultChecked="true"
                className="text-indigo-500"
              />
              <label htmlFor="storeData" className="px-2">
                Remember me!
              </label>
            </div>
            <button
              type="submit"
              className="bg-indigo-500 py-2 px-3 rounded-lg text-gray-100 transition duration-200 ease-in-out hover:bg-indigo-900"
            >
              Submit
            </button>
          </div>
        </div>
        <div>
          {error && (
            <p className="text-sm text-red-500 my-1">
              All fields are required.
            </p>
          )}
          {showSuccessMessage && (
            <p className="text-sm text-indigo-500 my-1">
              Comment submitted for review!
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default CommentsForm;
