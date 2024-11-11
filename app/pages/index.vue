<script setup lang="ts">
import { ScrollArea } from "~/components/ui/scroll-area/index";
import type { Task } from "~~/models/Task";

const tableHeads = ["number", "title", "description", "status", "issuer"];

const res = useFetch("/api/test");

const tasks: Task[] = [
  {
    id: 1,
    title: "وظيفة 1",
    description: "وصف 1",
    isFinished: true,
    issuerName: "مستخدم 1",
  },
  {
    id: 2,
    title: "وظيفة 1",
    description: "وصف 1",
    isFinished: false,
    issuerName: "مستخدم 1",
  },
];
</script>

<template>
  <div class="w-full h-full">
    <div
      class="flex flex-row items-center justify-between mb-4 rounded-md ring-1 ring-neutral-300 dark:ring-neutral-600 p-4 shadow-lg bg-blue-800/[0.05] hover:bg-blue-800/[0.07] dark:bg-background dark:hover:bg-white/5 transition-all backdrop-blur-lg"
    >
      <h3>{{ $t("requests") }}</h3>

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

    <ScrollArea class="h-full w-full shadow-lg rounded-md" :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'">
      <Accordion type="multiple" class="w-full flex flex-col gap-y-4" collapsible>
        <AccordionItem
          class="border border-neutral-300 dark:border-neutral-600 rounded-md hover:bg-gray-800/[0.03] dark:bg-background dark:hover:bg-white/5 shadow-lg transition-all"
          v-for="task in tasks"
          :key="task.id"
          :value="task.id.toString()"
        >
          <AccordionTrigger class="no-underline hover:no-underline px-4">
            <div class="w-11/12 flex flex-row items-center gap-x-4 justify-between">
              <p class="line-clamp-1">{{ task.title }}</p>
              <p
                class="rounded-sm shadow-sm px-2 py-1 text-xs"
                :class="{
                  'bg-teal-600 text-white': task.isFinished,
                  'bg-blue-600 text-white': !task.isFinished,
                }"
              >
                {{ task.isFinished ? $t("task.done") : $t("task.pending") }}
              </p>
            </div>
          </AccordionTrigger>
          <AccordionContent class="p-4 border-t border-neutral-300 dark:border-neutral-600">
            <div class="flex flex-col gap-y-4">
              <div class="flex flex-col gap-y-2">
                <h5 class="font-semibold text-neutral-700 dark:text-neutral-400">{{ $t("task.title") }}</h5>
                <p class="text-base">{{ task.title }}</p>
              </div>

              <div class="flex flex-col gap-y-2">
                <h5 class="font-semibold text-neutral-700 dark:text-neutral-400">{{ $t("task.description") }}</h5>
                <p class="text-base">{{ task.description }}</p>
              </div>

              <div class="flex flex-col gap-y-2">
                <h5 class="font-semibold text-neutral-700 dark:text-neutral-400">{{ $t("task.issuer") }}</h5>
                <p class="text-base">{{ task.issuerName }}</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </ScrollArea>
  </div>
</template>

<style scoped></style>
