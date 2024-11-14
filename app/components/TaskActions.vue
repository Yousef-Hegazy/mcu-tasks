<script setup lang="ts">
import type { Task } from "~~/models/Task";

const { t } = useI18n();

const { task, ar } = defineProps<{
  task: Task;
  ar: boolean;
}>();

let actions: {
  separator: boolean;
  name: string;
  onClick: () => void;
  icon: string;
  class?: string;
}[] = [];

if (import.meta.client) {
  actions = [
    {
      separator: false,
      name: task.isFinished ? "restore" : "finish",
      onClick: () => {
        console.log("Done");
      },
      icon: task.isFinished ? "hugeicons:circle-arrow-move-up-left" : "hugeicons:note-done",
    },
    {
      separator: false,
      name: "copy",
      onClick: () => {
        const text = `
${t("task.title")}: ${task.title}
${t("task.description")}: ${task.description}
${t("task.issuer")}: ${task.issuer}
${t("task.createdAt")}: ${task.createdAt.split("T")[0]}
${t("task.finishedAt")}: ${task.finishedAt ? task.finishedAt.split("T")[0] : "N/A"}
${t("task.status")}: ${task.isFinished ? t("task.done") : t("task.new")}
      `;
        if (navigator.clipboard) {
          navigator.clipboard
            .writeText(text)
            .then(() => {
              console.log("Text copied to clipboard");
            })
            .catch((err) => {
              console.error("Failed to copy text: ", err);
            });
        } else {
          console.error("Clipboard API is not supported in this environment");
        }
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
      class: "!text-rose-700 dark:!text-rose-400 hover:!text-rose-50 hover:dark:!text-rose-50 hover:!bg-rose-700",
      // iconClass: "text-inherit",
    },
  ];
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button size="icon" variant="ghost">
        <Icon name="hugeicons:more-horizontal-square-01" class="text-xl" />
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent>
      <template v-for="a in actions" :key="a.name">
        <DropdownMenuItem :dir="ar ? 'rtl' : 'ltr'" :class="a.class">
          <div
            @click="a.onClick"
            class="w-full cursor-pointer flex flex-row items-center justify-start text-start gap-x-2"
          >
            <Icon :name="a.icon" class="text-xl" />
            <p>{{ $t(`task.actions.${a.name}`) }}</p>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator v-if="a.separator" />
      </template>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<style scoped></style>
