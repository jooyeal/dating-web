import Link from "next/link";
import React from "react";
import { AiOutlineBell, AiOutlineSearch, AiOutlineUser } from "react-icons/ai";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { BiCog } from "react-icons/bi";
import { useTheme } from "next-themes";

type Props = {};

function Appbar({}: Props) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-row p-4 shadow w-full fixed h-16 z-40 bg-white dark:text-white dark:bg-slate-600">
      <Link href="/">
        <a className="basis-1/5 text-2xl flex items-center mobile:text-xs">
          WEMEWE
        </a>
      </Link>
      <div className="basis-2/5 flex justify-end mobile:hidden">
        <div className="flex flex-row items-center border rounded border-gray-400">
          <AiOutlineSearch className="mr-2 ml-2" />
          <input
            type="text"
            placeholder="Search..."
            className="p-2 h-full outline-none rounded dark:bg-slate-600"
          />
        </div>
      </div>

      <div className="basis-2/5 flex justify-end text-3xl gap-6 mobile:text-md mobile:basis-4/5">
        <div className="hidden mobile:block">
          <Link href="/profile">
            <a>
              <AiOutlineSearch />
            </a>
          </Link>
        </div>
        <Link href="/profile">
          <a className="mobile:hidden">
            <AiOutlineBell />
          </a>
        </Link>
        <Link href="/profile">
          <a className="mobile:hidden">
            <AiOutlineUser />
          </a>
        </Link>
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? <BsSunFill /> : <BsMoonFill />}
        </button>
        <Link href="/setting">
          <a>
            <BiCog />
          </a>
        </Link>
      </div>
    </div>
  );
}

export default Appbar;
