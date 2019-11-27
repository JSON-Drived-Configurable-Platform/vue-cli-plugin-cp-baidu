const getMenuList = (params = {}) => {
  return {
    url: "/app/menu-list",
    method: "get",
    params
  };
};

export default {
  getMenuList
};
