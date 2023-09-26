import { aesDecrypt, aesEncrypt } from "./crypto";

const findAccessTokenName = (itemName) => {
  const arr = Object.keys(localStorage);
  return arr.length > 0
    ? arr.filter((key) => aesDecrypt(key) === itemName)[0]
    : "";
};

export const getAccessToken = () => {
  const itemName = "sheMobileAccessToken";
  const localItemName = findAccessTokenName(itemName);
  const local = localStorage.getItem(localItemName);
  if (local !== null) {
    return aesDecrypt(local);
  } else {
    return "";
  }
};

export const setAccessToken = (strValue) => {
  const itemName = aesEncrypt("sheMobileAccessToken");
  const itemValue = aesEncrypt(strValue);
  localStorage.setItem(itemName, itemValue);
};

export const renewAccessToken = (strValue) => {
  const itemName = "sheMobileAccessToken";
  const encryptItemName = aesEncrypt(itemName);
  const itemValue = aesEncrypt(strValue);
  const localItemName = findAccessTokenName(itemName);
  localStorage.removeItem(localItemName);
  localStorage.setItem(encryptItemName, itemValue);
};

export const removeAccessToken = () => {
  const itemName = "sheMobileAccessToken";
  const localItemName = findAccessTokenName(itemName);
  localStorage.removeItem(localItemName);
};
