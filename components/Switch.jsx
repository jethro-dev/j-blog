import React from "react";
import { Switch } from "@headlessui/react";

const SwitchComponent = ({ theme, setTheme }) => {
  return (
    <Switch
      checked={theme === "dark" ? true : false}
      onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`${
        theme === "dark" ? "bg-white" : "bg-white"
      } relative inline-flex items-center h-6 rounded-full w-11`}
    >
      <span
        className={`transform transition ease-in-out duration-200
          ${
            theme === "dark"
              ? "translate-x-6 bg-gray-400"
              : "translate-x-1 bg-gray-400"
          } inline-block w-4 h-4 rounded-full`}
      />
    </Switch>
  );
};

export default SwitchComponent;
