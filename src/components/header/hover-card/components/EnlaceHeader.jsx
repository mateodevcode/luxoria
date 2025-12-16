import React from "react";
import Link from "next/link";

const EnlaceHeader = ({ item }) => {
  return (
    <li className="py-1">
      <Link
        href={item.href}
        className="text-segundo/70 dark:text-primero font-extralight hover:text-cuarto dark:hover:text-primero/70 transition-colors duration-200"
      >
        {item.name}
      </Link>
    </li>
  );
};

export default EnlaceHeader;
