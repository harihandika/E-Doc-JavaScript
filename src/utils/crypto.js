import CryptoJS from "crypto-js";

const salt = "2d7e3ba5";

export const hashPassword = (password) => {
  return CryptoJS.HmacSHA256(password, salt).toString(CryptoJS.enc.Hex);
};

export const aesEncrypt = (string) => {
  return CryptoJS.AES.encrypt(string, salt).toString();
};

export const aesDecrypt = (string) => {
  return CryptoJS.AES.decrypt(string, salt).toString(CryptoJS.enc.Utf8);
};
