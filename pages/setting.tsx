import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import BottomNavigation from "../components/BottomNavigation";
import { getMyPage } from "../services/userApi";
import { Info } from "./profile";

interface Props {
  userInfo: {
    email: string;
    username: string;
    birthday: string;
    gender: string;
  };
}

function Setting({ userInfo }: Props) {
  return (
    <div>
      <Head>
        <title>WEMEWE</title>
        <meta name="description" content="Dating app WEMEWE's setting" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="pt-20 pb-20 flex justify-center p-6 md:text-sm mobile:text-sm">
        <div className="w-4/5 shadow p-2 dark:shadow-gray-100 mobile:w-full">
          <div className="p-4">
            <div className="text-xl m-4">USER INFO</div>
            <Info label="email" content={userInfo.email} />
            <Info
              label="password"
              content={
                <input
                  className="dark:bg-slate-600 p-2 rounded"
                  type="password"
                  value=""
                  disabled
                />
              }
            />
            <Info label="username" content={userInfo.username} />
            <Info label="birthday" content={userInfo.birthday} />
            <Info label="gender" content={userInfo.gender} />
            <div className="mt-2 flex justify-end">
              <button className="p-2 bg-slate-400 rounded-md hover:bg-slate-500">
                MODIFY
              </button>
            </div>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await getMyPage();
  return {
    props: {
      userInfo: res,
    },
  };
};

export default Setting;
