<script setup lang="ts">
import type { Task } from "~~/models/Task";
import { useToast } from "@/components/ui/toast";

const { task } = defineProps<{
  task: Task;
}>();

const { toast } = useToast();

const queryClient = useQueryClient();

const deleteMutation = useMutation({
  mutationFn: async () => {
    return await $fetch(`/api/tasks/${task.id}`, {
      method: "delete",
    });
  },
  onSuccess: async () => {
    await queryClient.invalidateQueries({
      queryKey: ["tasks"],
    });

    toast({
      title: "تم الحذف بنجاح",
      description: "تم حذف الطلب بنجاح",
    });
  },
  onError: (error) => {
    console.error(error);
    toast({
      title: "حدث خطأ",
      description: "حاول مرة اخرى",
    });
  },
});

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
      name: task.isFinished ? "استعادة" : "تم الانتهاء",
      onClick: () => {
        console.log("Done");
      },
      icon: task.isFinished ? "hugeicons:circle-arrow-move-up-left" : "hugeicons:note-done",
    },
    {
      separator: false,
      name: "نسخ",
      onClick: () => {
        const text = `
العنوان: ${task.title}
الوصف: ${task.description}
مقدم الطلب: ${task.issuer}
تاريخ الانشاء: ${task.createdAt.split("T")[0]}
تاريخ الانتهاء: ${task.finishedAt ? task.finishedAt.split("T")[0] : "لا يوجد"}
الحالة: ${task.isFinished ? "منتهي" : "جديد"}
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
      name: "تعديل",
      onClick: () => {
        console.log("edit");
      },
      icon: "hugeicons:task-edit-02",
    },
    {
      separator: false,
      name: "حذف",
      onClick: deleteMutation.mutateAsync,
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
        <DropdownMenuItem :disabled="deleteMutation.isPending.value" dir="rtl" :class="a.class">
          <div
            @click="a.onClick"
            class="w-full cursor-pointer flex flex-row items-center justify-start text-start gap-x-2"
          >
            <Icon
              :name="deleteMutation.isPending.value ? 'hugeicons:loading-03' : a.icon"
              class="text-xl"
              :class="{
                'animate-spin': deleteMutation.isPending.value,
              }"
            />
            <p>{{ a.name }}</p>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator v-if="a.separator" />
      </template>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<style scoped></style>
