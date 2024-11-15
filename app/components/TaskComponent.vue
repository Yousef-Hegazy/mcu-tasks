<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Task } from "~~/models/Task";

const { task } = defineProps<{
  task: Task;
  index: number;
}>();

const cardData = computed(() => ({
  ["مقدم الطلب"]: task.issuer,
  ["تاريخ الانشاء"]: task.createdAt.split("T")[0],
  ["تاريخ الانتهاء"]: task.finishedAt ? task.finishedAt.split("T")[0] : "لا يوجد",
  ["الحالة"]: task.isFinished ? "منتهي" : "جديد",
}));
</script>

<template>
  <Card class="shadow-md" dir="rtl" :key="task.id">
    <!-- <ClientOnly> -->
    <CardHeader class="py-3 px-4">
      <div class="flex flex-row items-center justify-between">
        <AppTooltip :title="task.title">
          <CardTitle class="line-clamp-1 text-base flex flex-row items-center gap-x-2">
            <span
              class="text-xs font-light px-1.5 py-0.5 rounded"
              :class="{
                'bg-teal-600 text-teal-50': task.isFinished,
                'bg-blue-600 text-blue-50': !task.isFinished,
              }"
            >
              {{ index + 1 }}
            </span>
            <span>
              {{ task.title }}
            </span>
          </CardTitle>
        </AppTooltip>

        <TaskActions :task="task" />
      </div>

      <p class="text-sm text-muted-foreground line-clamp-1" v-if="task.description">{{ task.description }}</p>

      <!-- <template v-if="task.description">
        <AppTooltip :title="task.description">
          <CardDescription>
            <p class="text-sm line-clamp-1">{{ task.description }}</p>
          </CardDescription>
        </AppTooltip>
      </template> -->
    </CardHeader>
    <!-- </ClientOnly> -->

    <div class="border-b border-neutral-300 dark:border-neutral-600"></div>

    <CardContent class="py-4">
      <div class="flex flex-col gap-y-2">
        <div v-for="[k, v] in Object.entries(cardData)" :key="k" class="flex flex-row items-center gap-x-2">
          <p class="text-sm font-semibold max-w-24 rtl:max-w-20 w-full">{{ k }}:</p>

          <p
            v-if="k === 'الحالة'"
            class="rounded-sm shadow-sm px-2 py-1 text-sm font-medium"
            :class="{
              'bg-teal-600 text-teal-50': task.isFinished,
              'bg-blue-600 text-blue-50': !task.isFinished,
            }"
          >
            {{ v }}
          </p>
          <p v-else class="text-sm">{{ v }}</p>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<style scoped></style>
