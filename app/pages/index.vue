<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import TaskComponent from "~/components/TaskComponent.vue";
import TasksHeader from "~/components/TasksHeader.vue";
import { ScrollArea } from "~/components/ui/scroll-area/index";
import type { Task } from "~~/models/Task";

const { data: clientTasks, suspense } = useQuery<Task[]>({
  queryKey: ["tasks"],
  queryFn: async () => {
    return await $fetch("http://localhost:8080/tasks");
  },
  initialData: [],
});

onServerPrefetch(async () => {
  await suspense();
});
</script>

<template>
  <div class="w-full h-full" v-if="clientTasks && clientTasks.length >= 0">
    <TasksHeader :tasks="clientTasks || []" />

    <ScrollArea v-if="clientTasks && clientTasks.length > 0" class="h-full w-full" dir="rtl">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <TaskComponent v-for="(task, index) in clientTasks || []" :task="task" :key="task.id" :index="index" />
      </div>
    </ScrollArea>
  </div>

  <div v-else class="flex flex-row items-center justify-center w-full h-full p-8">
    <h1 class="text-xl font-bold">No Tasks Yet</h1>
  </div>
</template>

<style scoped></style>
