<script setup lang="ts">
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import type { Task } from "~~/models/Task";
import ContextMenuSeparator from "./ui/context-menu/ContextMenuSeparator.vue";

const { task, ar } = defineProps<{
  task: Task;
  ar: boolean;
  index: number;
}>();

const { t } = useI18n();

const actions = [
  {
    separator: false,
    name: "finish",
    onClick: () => {
      console.log("Done");
    },
    icon: "hugeicons:note-done",
  },
  {
    separator: false,
    name: "copy",
    onClick: () => {
      const text = `
${t("task.title")}: ${ar ? task.titleAr : task.titleEn}
${t("task.description")}: ${ar ? task.descriptionAr : task.descriptionEn}
${t("task.issuer")}: ${ar ? task.issuerAr : task.issuerEn}
${t("task.createdAt")}: ${task.createdAt.split("T")[0]}
${t("task.finishedAt")}: ${task.finishedAt ? task.finishedAt.split("T")[0] : "N/A"}
${t("task.status")}: ${task.isFinished ? t("task.done") : t("task.new")}
      `;
      navigator.clipboard.writeText(text);
    },
    icon: "hugeicons:copy-02",
  },
  {
    separator: true,
    name: "edit",
    onClick: () => {
      console.log("edit");
    },
    icon: "hugeicons:task-edit-02",
  },
  {
    separator: false,
    name: "delete",
    onClick: () => {
      console.log("delete");
    },
    icon: "hugeicons:delete-03",
    class: "!text-rose-700 hover:!text-rose-50 hover:!bg-rose-700",
    // iconClass: "text-inherit",
  },
];
</script>

<template>
  <AccordionItem
    class="border border-neutral-300 dark:border-neutral-600 rounded-md hover:bg-gray-800/[0.03] dark:bg-background dark:hover:bg-white/5 shadow-md transition-all"
    :value="task.id.toString()"
  >
    <ContextMenu>
      <ContextMenuTrigger as-child>
        <AccordionTrigger class="no-underline hover:no-underline px-4">
          <div class="w-11/12 flex flex-row items-center gap-x-4 justify-between">
            <div class="flex flex-row items-center gap-x-2">
              <p
                class="text-xs font-semibold px-1.5 py-0.5 rounded"
                :class="{
                  'bg-teal-600 text-teal-50': task.isFinished,
                  'bg-blue-600 text-blue-50': !task.isFinished,
                }"
              >
                {{ index + 1 }}
              </p>
              <p class="line-clamp-1">{{ ar ? task.titleAr : task.titleEn }}</p>
            </div>
            <p
              class="rounded-sm shadow-sm px-2 py-1 text-sm font-medium"
              :class="{
                'bg-teal-600 text-teal-50': task.isFinished,
                'bg-blue-600 text-blue-50': !task.isFinished,
              }"
            >
              {{ task.isFinished ? $t("task.done") : $t("task.new") }}
            </p>
          </div>
        </AccordionTrigger>
      </ContextMenuTrigger>

      <ContextMenuContent>
        <template v-for="a in actions">
          <ContextMenuItem
            :dir="ar ? 'rtl' : 'ltr'"
            :inset="!a.class"
            @select="a.onClick"
            class="cursor-pointer p-2"
            :class="a.class"
          >
            <div class="w-full flex flex-row items-center justify-start text-start gap-x-2">
              <Icon :name="a.icon" class="text-xl" />
              <p>{{ $t(`task.actions.${a.name}`) }}</p>
            </div>
          </ContextMenuItem>

          <ContextMenuSeparator v-if="a.separator" />
        </template>
      </ContextMenuContent>
    </ContextMenu>
    <AccordionContent class="p-4 border-t border-neutral-300 dark:border-neutral-600">
      <div class="flex flex-col gap-y-4">
        <div class="flex flex-col gap-y-2">
          <h5 class="font-semibold text-neutral-700 dark:text-neutral-400">{{ $t("task.title") }}</h5>
          <p class="text-base">{{ ar ? task.titleAr : task.titleEn }}</p>
        </div>

        <div class="flex flex-col gap-y-2">
          <h5 class="font-semibold text-neutral-700 dark:text-neutral-400">{{ $t("task.description") }}</h5>
          <p class="text-base">{{ ar ? task.descriptionAr : task.descriptionEn }}</p>
        </div>

        <data class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 justify-evenly">
          <div class="flex flex-col gap-y-2">
            <h5 class="font-semibold text-neutral-700 dark:text-neutral-400">{{ $t("task.issuer") }}</h5>
            <p class="text-base">{{ ar ? task.issuerAr : task.issuerEn }}</p>
          </div>

          <div class="flex flex-col gap-y-2">
            <h5 class="font-semibold text-neutral-700 dark:text-neutral-400">{{ $t("task.createdAt") }}</h5>
            <p class="text-base">{{ task.createdAt.split("T")[0] }}</p>
          </div>

          <div v-if="task.isFinished && task.finishedAt" class="flex flex-col gap-y-2">
            <h5 class="font-semibold text-neutral-700 dark:text-neutral-400">{{ $t("task.finishedAt") }}</h5>
            <p class="text-base">{{ task.finishedAt.split("T")[0] }}</p>
          </div>
        </data>
      </div>
    </AccordionContent>
  </AccordionItem>
</template>

<style scoped></style>
