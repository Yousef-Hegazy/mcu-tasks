<script setup lang="ts">
import TaskComponent from "~/components/TaskComponent.vue";
import TasksHeader from "~/components/TasksHeader.vue";
import { ScrollArea } from "~/components/ui/scroll-area/index";
import type { Task } from "~~/models/Task";

const { locale } = useI18n();

const tableHeads = ["number", "title", "description", "status", "issuer"];

// const res = useFetch("/api/test");

const ar = computed<boolean>(() => locale.value === "ar");

const { data: tasks } = await useFetch<Task[]>("http://localhost:8080/tasks", {
  method: "get",
});
</script>

<template>
  <div class="w-full h-full" v-if="tasks && tasks.length >= 0">
    <TasksHeader :tasks="tasks" :ar="ar" />

    <ScrollArea
      v-if="tasks.length > 0"
      class="h-full w-full shadow-md rounded-md"
      :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'"
    >
      <Accordion type="multiple" class="w-full flex flex-col gap-y-1" collapsible>
        <TaskComponent v-for="(task, index) in tasks" :task="task" :ar="ar" :key="task.id" :index="index" />
      </Accordion>
    </ScrollArea>
  </div>

  <div v-else class="flex flex-row items-center justify-center w-full h-full p-8">
    <h1 class="text-xl font-bold">No Tasks Yet</h1>
  </div>
</template>

<style scoped></style>
