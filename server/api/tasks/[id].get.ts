import db from "~~/data.json";

export default defineEventHandler(async (event) => {
  try {
    const params = getRouterParams(event);
    const tasks = db.tasks;
    const task = tasks.find((t) => t.id.toString() === params.id.toString().trim());

    if (!task) {
      return createError({
        status: 404,
        message: "Task not found",
      });
    }
    setResponseStatus(event, 200);

    return task;
  } catch (error) {
    console.log(error);
    setResponseStatus(event, 500);
    return createError({
      status: 500,
      message: "Internal Server Error",
    });
  }
});
