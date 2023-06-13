export default function ({ app, redirect, route }) {
  const getTimestampInSeconds = () => {
    return Math.floor(new Date().getTime() / 1000);
  };

  const tokenIsExpired = () => {
    return getTimestampInSeconds() - app.$cookies.get("created_at") > 86400;
  };

  const isAuthenticated = () => {
    return app.$cookies.get("access_token") ? true : false;
  };

  if (isAuthenticated() && !tokenIsExpired()) {
    if (route.name === "login" || route.name === "register") {
      redirect("/home/events");
    }
  } else {
    if (route.name !== "login" && route.name !== "register") {
      redirect("/login");
    }
  }
}
