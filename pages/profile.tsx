import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { ChangeEvent, useState } from "react";
import Appbar from "../components/Appbar";
import BottomNavigation from "../components/BottomNavigation";
import ImageUpload from "../components/ImageUpload";
import {
  getMyPage,
  modifyIntroduction,
  uploadImage,
} from "../services/userApi";

interface Props {
  myInfo: UserInfo;
}

export const Info = ({ label, content }: InfoProps) => {
  return (
    <div className="flex items-center border-b p-4">
      <div className="w-2/6">{label}</div>
      <div className="w-3/6">{content}</div>
    </div>
  );
};

function Profile({ myInfo }: Props) {
  const router = useRouter();
  const [img, setImg] = useState<any>();
  const [introduction, setIntroduction] = useState<string>(
    myInfo.introduction ?? ""
  );

  const onClickUpload = () => {
    if (img) {
      const formData = new FormData();
      formData.append("img", img);
      uploadImage(formData, router);
    }
  };

  const onChangeIntroduction = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setIntroduction(e.target.value);
  };

  const onClickIntroductionModify = () => {
    modifyIntroduction({ introduction }, router);
  };

  return (
    <div>
      <Head>
        <title>WEMEWE</title>
        <meta name="description" content="Dating app WEMEWE's user profile" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Appbar />
      <div className="pt-20 pb-20 flex justify-center p-6 md:text-sm mobile:text-sm">
        <div className="w-4/5 shadow p-2 dark:shadow-gray-100 mobile:w-full">
          <div className="border-b p-4">
            <div className="text-xl m-4">USER IMAGE</div>
            <div className="flex justify-center">
              <ImageUpload img={myInfo.avatar ?? ""} setImg={setImg} />
            </div>
            <div className="mt-2 flex justify-end">
              <button
                className="p-2 bg-slate-400 rounded-md hover:bg-slate-500"
                onClick={onClickUpload}
              >
                MODIFY
              </button>
            </div>
          </div>
          <div>
            <div className="text-xl m-4">USER DESCRIPTION</div>
            <div className="p-4">
              <textarea
                rows={8}
                maxLength={900}
                className="resize-none outline-none w-full rounded p-2 border dark:bg-slate-600"
                onChange={onChangeIntroduction}
                value={introduction}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="p-2 bg-slate-400 rounded-md hover:bg-slate-500"
                onClick={onClickIntroductionModify}
              >
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
  const myInfo = await getMyPage(`bearer ${ctx.req.cookies["wemewe-token"]}`);

  return {
    props: { myInfo },
  };
};

export default Profile;
