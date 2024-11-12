<script setup lang="ts">
import type { Task } from "~~/models/Task";

const { tasks } = defineProps<{
  tasks: Task[];
}>();

const tasksStats = computed(() => {
  const finished = tasks.filter((t) => t.isFinished).length;
  const newTasks = tasks.filter((t) => !t.isFinished).length;
  return { finished, newTasks };
});

const onPrint = () => {};
</script>

<template>
  <div
    class="flex flex-row items-center justify-between mb-4 rounded-md ring-1 ring-neutral-300 dark:ring-neutral-600 p-4 shadow-lg bg-blue-800/[0.05] hover:bg-blue-800/[0.07] dark:bg-background dark:hover:bg-white/5 transition-all backdrop-blur-lg"
  >
    <div class="flex flex-row items-center gap-x-2">
      <h3>{{ $t("requests") }}</h3>
      <AppTooltip>
        <p class="text-xs text-blue-50 bg-blue-700 px-2 py-1 rounded">{{ tasks.length }}</p>
        <template #content>
          <div class="flex flex-col gap-y-3">
            <div class="flex flex-row items-center gap-x-2">
              <span class="p-1 rounded-full bg-blue-600"></span>
              <p>{{ $t("task.new") }}:</p>
              <p class="text-xs">
                {{ tasksStats.newTasks }}
              </p>
            </div>

            <div class="flex flex-row items-center gap-x-2">
              <span class="p-1 rounded-full bg-teal-600"></span>
              <p>{{ $t("task.done") }}:</p>
              <p class="text-xs">
                {{ tasksStats.finished }}
              </p>
            </div>
          </div>
        </template>
      </AppTooltip>
    </div>

    <div class="flex flex-row gap-x-3">
      <AppTooltip :title="$t('addTask')">
        <Button size="icon" variant="default">
          <Icon name="hugeicons:task-add-02" class="text-xl" />
        </Button>
      </AppTooltip>

      <AppTooltip :title="$t('downloadReport')">
        <Button size="icon" variant="outline">
          <Icon name="hugeicons:inbox-download" class="text-2xl" />
        </Button>
      </AppTooltip>
    </div>
  </div>
</template>

<style scoped></style>
