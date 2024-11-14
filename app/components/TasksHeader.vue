<script setup lang="ts">
import * as XLSX from "xlsx";
import type { Task } from "~~/models/Task";
import AppDialog from "./AppDialog.vue";

const { t } = useI18n();

const { tasks, ar } = defineProps<{
  tasks: Task[];
  ar: boolean;
}>();

const printing = ref(false);

const exportToExcel = async (name: string = "report.xlsx") => {
  try {
    printing.value = true;
    const data = await Promise.resolve(
      tasks.map((task) => ({
        [t("task.title")]: ar ? task.titleAr : task.titleEn,
        [t("task.description")]: ar ? task.descriptionAr : task.descriptionEn,
        [t("task.issuer")]: ar ? task.issuerAr : task.issuerEn,
        [t("task.createdAt")]: task.createdAt.split("T")[0],
        [t("task.finishedAt")]: task.finishedAt ? task.finishedAt.split("T")[0] : "N/A",
        [t("task.status")]: task.isFinished ? t("task.done") : t("task.new"),
      }))
    );
    const sheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet, name);
    await XLSX.writeFileXLSX(workbook, name, {
      cellStyles: true,
    });
  } catch (error) {
    console.log(error);
  } finally {
    printing.value = false;
  }
};

const tasksStats = computed(() => {
  const finished = tasks.filter((t) => t.isFinished).length;
  const newTasks = tasks.filter((t) => !t.isFinished).length;
  return { finished, newTasks };
});

// const onPrint = () => {};
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
      <AddTask />

      <AppTooltip :title="$t('downloadReport')">
        <Button size="icon" variant="outline" @click="() => exportToExcel('Report.xlsx')">
          <Icon
            :name="printing ? 'hugeicons:loading-03' : 'hugeicons:inbox-download'"
            class="text-2xl"
            :class="{
              'animate-spin': printing,
            }"
          />
        </Button>
      </AppTooltip>
    </div>
  </div>
</template>

<style scoped></style>
