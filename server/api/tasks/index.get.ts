import db from "~~/data.json";

export default defineEventHandler(async (event) => {
  try {
    const tasks = db.tasks;
    setResponseStatus(event, 200);
    return tasks;
  } catch (error) {
    console.log(error);
    setResponseStatus(event, 500);
    return createError({
      status: 500,
      message: "Internal Server Error",
    });
  }
});