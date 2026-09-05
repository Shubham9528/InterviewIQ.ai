import https from "https";

const APP_URL = "https://interviewiq-ai-5450.onrender.com";

const intervalMinutes = 14; // Render free tier sleeps after 15 mins of inactivity

export const startKeepAlive = () => {
  setInterval(
    () => {
      https
        .get(APP_URL, (res) => {
          console.log(
            `[${new Date().toISOString()}] Keep-alive ping sent, status: ${res.statusCode}`,
          );
        })
        .on("error", (err) => {
          console.error(
            `[${new Date().toISOString()}] Keep-alive ping failed:`,
            err.message,
          );
        });
    },
    intervalMinutes * 60 * 1000,
  );

  console.log(
    `Keep-alive started — pinging ${APP_URL} every ${intervalMinutes} minutes`,
  );
};
