const login = (payload) => ({
  method: "POST",
  url: "/user/login",
  payload,
});

const getData = (queryParams) => ({
  method: "GET",
  url: "/user",
  queryParams,
});

const checkNrpExist = (queryParams) => ({
  method: "GET",
  url: "/user/checkNrpExist",
  queryParams,
});

const checkEmailExist = (queryParams) => ({
  method: "GET",
  url: "/user/checkEmailExist",
  queryParams,
});

const createData = (payload) => ({
  method: "POST",
  url: "/user",
  payload,
});

export const userService = {
  login,
  getData,
  checkNrpExist,
  checkEmailExist,
  createData,
};
