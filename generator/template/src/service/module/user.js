const getUserInfo = (params = {}) => {
  return {
    url: "rbac/user-info",
    method: "get",
    params
  };
};

export default {
  getUserInfo
};
