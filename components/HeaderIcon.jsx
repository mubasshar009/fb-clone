import React from "react";

const HeaderIcon = ({ Icon, active }) => {
  return (
    <div className="flex items-center rounded-xl cursor-pointer sm:h-14 md:px-10 hover:bg-gray-100 active:border-b-2 border-blue-500 group">
      <Icon
        className={`h-5 text-gray-500 group-hover:text-blue-500 text-center md:h-7 mx-auto ${
          active && `text-blue-500`
        }`}
      />
    </div>
  );
};

export default HeaderIcon;
