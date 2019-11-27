const getHomeData = (params = {}) => {
  return {
    url: "/app/home-data",
    method: "get",
    params
  };
};

export default {
  getHomeData
};
