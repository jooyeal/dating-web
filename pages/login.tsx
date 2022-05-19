import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { excuteLogin } from "../services/authApi";

type Props = {};

function Login({}: Props) {
  const router = useRouter();
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const onChange = (e: any) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  const onClickLogin = () => {
    dispatch(excuteLogin(userInfo));
  };

  useEffect(() => {
    if (authState.status === "success") {
      router.push("/");
    }
  }, [authState.status]);
  return (
    <div>
      <Head>
        <title>WEMEWE</title>
        <meta name="description" content="Dating app WEMEWE's user regist" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col justify-center w-5/6 h-5/6 shadow p-4">
          <div className="flex justify-center text-2xl">LOGIN</div>
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
            <div className="m-2 text-xl">password</div>
            <input
              className="border-b outline-none w-full focus:border-purple-900 focus:border-b-2 transition-all"
              type="password"
              name="password"
              value={userInfo.password}
              onChange={onChange}
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <button
              className="bg-purple-900 text-white rounded p-2"
              onClick={onClickLogin}
            >
              LOGIN
            </button>
            <Link href="/regist">
              <a className="text-blue-500">let's user regist</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
