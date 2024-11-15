import { Task } from "~~/models/Task";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParams(event).id;

    const tasks = await fetch("http://localhost:8080/tasks", { method: "GET" }).then((res) => res.json());
    const task = tasks.find((t: Task) => Number(t.id) === Number(id));

    console.log(task.id);

    if (!task) {
      return createError({
        status: 404,
        message: "Task not found",
      });
    }

    const res = await fetch(`http://localhost:8080/tasks/${task.id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      console.log(res);
      createError({
        status: res.status,
        message: res.statusText,
      });
      return;
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
