import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

const Drawer = ({ children, isOpen, setIsOpen, title }) => {
  return (
    <div
      className={
        "fixed overflow-hidden z-[99] bg-gray-900 bg-opacity-30 inset-0 transform ease-in-out " +
        (isOpen
          ? " transition-opacity opacity-100 duration-500"
          : " transition-opacity delay-300 duration-500 opacity-0 pointer-events-none")
      }
    >
      <section
        className={
          " w-screen max-w-md right-0 absolute z-[9999] bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
          (isOpen ? " translate-x-0 " : " translate-x-full ")
        }
      >
        <article className="relative w-screen max-w-lg flex flex-col h-full">
          <header className="h-[70px] p-6 font-bold text-lg flex items-center justify-between border-b border-neutral-1000">
            <h3>{title}</h3>
            <button onClick={() => setIsOpen()}>
              <IoCloseOutline size={32} />
            </button>
          </header>
          <div className="h-full">{children}</div>
        </article>
      </section>
      <section
        className=" w-screen h-full cursor-pointer "
        onClick={() => setIsOpen()}
      ></section>
      {/* <button onClick={() => setIsOpen((prev: boolean) => !prev)}>close</button> */}
    </div>
  );
};

export default Drawer;
