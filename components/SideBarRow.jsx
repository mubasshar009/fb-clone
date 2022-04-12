import Image from "next/image";
import React from "react";

const SideBarRow = ({ image, Icon, title }) => {
  return (
    <div className="flex p-3 space-x-2 items-center hover:bg-gray-200 rounded-xl cursor-pointer">
      {image && (
        <Image
          className="rounded-full"
          src={image}
          width={40}
          height={40}
          layout="fixed"
        />
      )}

      {Icon && <Icon className="h-8 w-8 text-blue-500" />}
      <p className="hidden sm:inline-flex">{title}</p>
    </div>
  );
};

export default SideBarRow;
