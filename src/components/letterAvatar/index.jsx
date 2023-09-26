import React, { useEffect, useState } from "react";
import { Avatar, Badge } from "antd";
import { useJwt } from "react-jwt";
import { getAccessToken, generateColor } from "@/utils";

const LetterAvatar = ({ badgeActive, shape, size, style }) => {
  const accessToken = getAccessToken();
  const { decodedToken } = useJwt(accessToken || "");

  const [userData, setUserData] = useState({});

  const generateLetter = (fullName) => {
    if (fullName === "") return "";
    const fullNameArr = fullName.split(" ");
    return fullNameArr[0][0] + fullNameArr[1][0];
  };

  useEffect(() => {
    if (decodedToken) {
      setUserData(decodedToken);
    }
  }, [decodedToken]);

  return (
    <>
      <Badge dot={badgeActive}>
        <Avatar
          shape={shape}
          size={size}
          style={{
            backgroundColor: generateColor(`${userData.fullName}`).lightShade,
            color: generateColor(`${userData.fullName}`).darkShade,
            ...style,
          }}
        >
          {Object.keys(userData).length > 0 &&
            generateLetter(userData.fullName)}
        </Avatar>
      </Badge>
    </>
  );
};

export default LetterAvatar;
