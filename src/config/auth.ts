const days = 30;

export default {
  secret_token: process.env.SECRET_TOKEN,
  expires_in_token: "15m",
  //   md5 em md5
  secret_refresh_token: "7f138a09169b250e9dcb378140907378",
  expires_refresh_token_days: days,
  expires_in_refresh_token: `${days}d`,
};
