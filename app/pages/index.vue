<script setup lang="ts">
import data from "~/../data.json";
import TaskComponent from "~/components/TaskComponent.vue";
import TasksHeader from "~/components/TasksHeader.vue";
import { ScrollArea } from "~/components/ui/scroll-area/index";
import type { Task } from "~~/models/Task";

const { locale } = useI18n();

const tableHeads = ["number", "title", "description", "status", "issuer"];

// const res = useFetch("/api/test");

const ar = computed<boolean>(() => locale.value === "ar");

const tasks: Task[] = data.tasks;
</script>

<template>
  <div class="w-full h-full">
    <TasksHeader :tasks="tasks" :ar="ar" />

    <ScrollArea class="h-full w-full shadow-md rounded-md" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'">
      <Accordion type="multiple" class="w-full flex flex-col gap-y-1" collapsible>
        <TaskComponent v-for="(task, index) in tasks" :task="task" :ar="ar" :key="task.id" :index="index" />
      </Accordion>
    </ScrollArea>
  </div>
</template>

<style scoped></style>
