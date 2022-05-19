import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { registUser } from "../services/authApi";

type Props = {};

function regist({}: Props) {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<RegistInfo>({
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
    birthday: "",
    gender: "",
  });
  const onChange = (e: any) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  const onClickRegist = () => {
    registUser(userInfo, router);
  };
  return (
    <div>
      <Head>
        <title>WEMEWE</title>
        <meta name="description" content="Dating app WEMEWE's login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex p-20 h-auth w-full items-center justify-center mobile:p-2">
        <div className="flex flex-col justify-center w-5/6 h-5/6 shadow p-4">
          <div className="flex justify-center text-2xl">REGIST</div>
          <div className="p-4">
            <div className="m-2 text-xl">email</div>
            <input
              className="border-b outline-none w-full focus:border-purple-900 focus:border-b-2 transition-all"
              type="text"
              name="email"
              value={userInfo.email}
              onChange={onChange}
            />
          </div>
          <div className="p-4">
            <div className="m-2 text-xl">username</div>
            <input
              className="border-b outline-none w-full focus:border-purple-900 focus:border-b-2 transition-all"
              type="text"
              name="username"
              value={userInfo.username}
              onChange={onChange}
            />
          </div>
          <div className="p-4">
            <div className="m-2 text-xl">password</div>
            <input
              className="border-b outline-none w-full focus:border-purple-900 focus:border-b-2 transition-all"
              type="password"
              name="password"
              value={userInfo.password}
              onChange={onChange}
            />
          </div>
          <div className="p-4">
            <div className="m-2 text-xl">password confirm</div>
            <input
              className="border-b outline-none w-full focus:border-purple-900 focus:border-b-2 transition-all"
              type="password"
              name="passwordConfirm"
              value={userInfo.passwordConfirm}
              onChange={onChange}
            />
          </div>
          <div className="p-4">
            <div className="m-2 text-xl">birthday</div>
            <input
              className="border-b outline-none w-full focus:border-purple-900 focus:border-b-2 transition-all"
              type="date"
              name="birthday"
              value={userInfo.birthday}
              onChange={onChange}
            />
          </div>
          <div className="p-4">
            <div className="m-2 text-xl">gender</div>
            <select
              className="border-b outline-none w-full focus:border-purple-900 focus:border-b-2 transition-all"
              name="gender"
              value={userInfo.gender}
              onChange={onChange}
            >
              <option hidden>please select</option>
              <option value="M">MAN</option>
              <option value="W">WOMAN</option>
            </select>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <button
              className="bg-purple-900 text-white rounded p-2"
              onClick={onClickRegist}
            >
              REGIST
            </button>
            <Link href="/login">
              <a className="text-blue-500">back to login page</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default regist;
