<script setup lang="ts">
import { ScrollArea } from "~/components/ui/scroll-area/index";
import type { Task } from "~~/models/Task";
import data from "~/../data.json";

const { locale } = useI18n();

const tableHeads = ["number", "title", "description", "status", "issuer"];

const res = useFetch("/api/test");

const ar = computed<boolean>(() => locale.value === "ar");

const tasks: Task[] = data.tasks;
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
              <p class="line-clamp-1">{{ ar ? task.titleAr : task.titleEn }}</p>
              <p
                class="rounded-sm shadow-sm px-2 py-1 text-xs"
                :class="{
                  'bg-teal-600 text-white': task.isFinished,
                  'bg-blue-600 text-white': !task.isFinished,
                }"
              >
                {{ task.isFinished ? $t("task.done") : $t("task.new") }}
              </p>
            </div>
          </AccordionTrigger>
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

                <div v-if="task.finishedAt" class="flex flex-col gap-y-2">
                  <h5 class="font-semibold text-neutral-700 dark:text-neutral-400">{{ $t("task.finishedAt") }}</h5>
                  <p class="text-base">{{ task.finishedAt.split("T")[0] }}</p>
                </div>
              </data>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </ScrollArea>
  </div>
</template>

<style scoped></style>
