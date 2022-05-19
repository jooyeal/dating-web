import Link from "next/link";
import React from "react";
import {
  AiOutlineBell,
  AiOutlineHome,
  AiOutlineMessage,
  AiOutlineUser,
} from "react-icons/ai";

type Props = {};

function BottomNavigation({}: Props) {
  return (
    <div className="flex-row p-4 w-full fixed bottom-0 h-16 z-40 bg-white dark:text-white dark:bg-slate-600 hidden mobile:flex">
      <div className="basis-1/4 flex justify-center text-2xl">
        <Link href="/">
          <a>
            <AiOutlineHome />
          </a>
        </Link>
      </div>
      <div className="basis-1/4 flex justify-center text-2xl">
        <Link href="/chat">
          <a>
            <AiOutlineMessage />
          </a>
        </Link>
      </div>
      <div className="basis-1/4 flex justify-center text-2xl">
        <Link href="/notification">
          <a>
            <AiOutlineBell />
          </a>
        </Link>
      </div>
      <div className="basis-1/4 flex justify-center text-2xl">
        <Link href="/profile">
          <a>
            <AiOutlineUser />
          </a>
        </Link>
      </div>
    </div>
  );
}

export default BottomNavigation;
