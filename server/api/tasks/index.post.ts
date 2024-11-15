import { Task } from "~~/models/Task";
import { addTaskSchema } from "~~/validationSchemas/task";

export default defineEventHandler(async (event) => {
  const res = await readValidatedBody(event, (b) => addTaskSchema.safeParse(b));

  if (!res.success || !res.data || res.error) {
    createError({
      status: 400,
      message: res.error.errors[0].message,
    });
    return;
  }

  const task: Task = {
    id: Math.ceil(Math.random() * 1000).toString(),
    title: res.data.title,
    description: res.data.description,
    isFinished: false,
    issuer: res.data.issuer,
    createdAt: new Date().toISOString(),
    finishedAt: undefined,
  };

  const addRes = await fetch("http://localhost:8080/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!addRes.ok) {
    createError({
      status: addRes.status,
      message: "حدث خطأ أثناء إضافة المهمة",
    });
    return;
  }

  setResponseStatus(event, 201);
  return task;
});
