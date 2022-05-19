import Image from "next/image";
import React, { useState } from "react";
import {
  AiFillHeart,
  AiOutlineDown,
  AiOutlineHeart,
  AiOutlineMan,
  AiOutlineUp,
  AiOutlineWoman,
} from "react-icons/ai";
import { sendFavoriteNotification } from "../services/notificationApi";
import { addFavorite, deleteFavorite } from "../services/userApi";

interface Props extends UserInfo {
  isFavorite: boolean;
}

function UserCard({
  _id,
  username,
  introduction,
  avatar,
  birthday,
  gender,
  isFavorite,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(isFavorite);
  const onDoubleClick = () => {
    console.log("dobule");
  };

  const onClickFavorite = () => {
    if (favorite) {
      deleteFavorite(_id);
    } else {
      addFavorite(_id);
      sendFavoriteNotification(_id);
    }
  };

  const ageCalculate = (birthday: string) => {
    if (birthday) {
      const birthdayArray = birthday.split("-");
      const today = new Date();
      const age = today.getFullYear() - Number(birthdayArray[0]);
      const mon = today.getMonth() - Number(birthdayArray[1]);
      if (
        mon < 0 ||
        (mon === 0 && today.getDate() < Number(birthdayArray[2]))
      ) {
        return age - 1;
      } else {
        return age;
      }
    }
  };
  return (
    <div
      className="w-96 h-96 z-0 relative shadow-2xl rounded-md mobile:w-80 mobile:h-80"
      onDoubleClick={onDoubleClick}
    >
      <div className="">
        <Image
          src={`/${avatar ? avatar : "uploads/default-user-image.png"}`}
          width={384}
          height={384}
          className="rounded-md"
        />
      </div>
      <div
        className={`flex flex-col justify-center bg-gray-600 absolute bottom-0 bg-opacity-50 z-10 w-full transition-all rounded-md ${
          open ? "h-full bg-opacity-70" : "h-1/4"
        }`}
      >
        <div
          className="flex flex-col justify-center items-center cursor-pointer w-full pt-2"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? (
            <AiOutlineDown className="text-white text-2xl" />
          ) : (
            <AiOutlineUp className="text-white text-2xl" />
          )}
          <div className="flex justify-start items-center w-full p-2 text-lg text-white gap-4">
            <div>{username}</div>
            <div>{ageCalculate(birthday)}</div>
            <div>{gender === "M" ? <AiOutlineMan /> : <AiOutlineWoman />}</div>
          </div>
        </div>
        {open && (
          <div className="flex flex-col justify-between h-5/6">
            <div className="text-white p-2">{introduction}</div>
            <div className="flex items-center justify-center w-full h-10 text-2xl">
              <button onClick={() => setFavorite((prev) => !prev)}>
                {favorite ? (
                  <AiFillHeart
                    className="text-red-400"
                    onClick={onClickFavorite}
                  />
                ) : (
                  <AiOutlineHeart
                    className="text-white"
                    onClick={onClickFavorite}
                  />
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserCard;
