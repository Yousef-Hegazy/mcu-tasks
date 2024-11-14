<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Task } from "~~/models/Task";

const { task, ar } = defineProps<{
  task: Task;
  ar: boolean;
  index: number;
}>();

const { t } = useI18n();

const cardData = computed(() => ({
  issuer: task.issuer,
  createdAt: task.createdAt.split("T")[0],
  finishedAt: task.finishedAt ? task.finishedAt.split("T")[0] : t("common.N/A"),
  status: task.isFinished ? t("task.done") : t("task.new"),
}));
</script>

<template>
  <Card class="shadow-md">
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

        <TaskActions :ar="ar" :task="task" />
      </div>

      <AppTooltip :title="task.description">
        <CardDescription v-if="task.description">
          <p class="text-sm line-clamp-1">{{ task.description }}</p>
        </CardDescription>
      </AppTooltip>
    </CardHeader>

    <div class="border-b border-neutral-300 dark:border-neutral-600"></div>

    <CardContent class="py-4">
      <div class="flex flex-col gap-y-2">
        <div v-for="[k, v] in Object.entries(cardData)" :key="k" class="flex flex-row items-center gap-x-2">
          <p class="text-sm font-semibold max-w-24 rtl:max-w-20 w-full">{{ t(`task.${k}`) }}:</p>

          <p
            v-if="k === 'status'"
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

    <!-- <ContextMenu>
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
    </AccordionContent> -->
  </Card>
</template>

<style scoped></style>
