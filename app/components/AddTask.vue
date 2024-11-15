<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { addTaskSchema } from "~~/validationSchemas/task";
import { useToast } from "@/components/ui/toast";

const { toast } = useToast();
const formSchema = toTypedSchema(addTaskSchema);
const queryClient = useQueryClient();

const { handleSubmit, resetForm, isSubmitting } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values) => {
  try {
    const res = await $fetch("/api/tasks/", {
      method: "POST",
      body: values,
    });

    if (res?.title) {
      resetForm();
      toggleDialog();
      await queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
      toast({
        title: "تمت الاضافة بنجاح",
        description: res.createdAt.split("T")[0],
      });
    }
  } catch (error) {
    console.error(error);
    toast({
      title: "حدث خطأ",
      description: "حاول مرة اخرى",
    });
  }
});

const open = ref(false);

const toggleDialog = () => {
  open.value = !open.value;
};
</script>

<template>
  <Dialog dir="rtl" :open="open">
    <AppTooltip title="إضافة طلب جديد">
      <Button size="icon" variant="default" @click="toggleDialog">
        <Icon name="hugeicons:task-add-02" class="text-xl" />
      </Button>
    </AppTooltip>

    <DialogContent :disable-outside-pointer-events="true" class="w-full max-w-lg">
      <DialogHeader class="flex flex-row items-center w-full gap-x-4 justify-between">
        <DialogTitle> إضافة طلب جديد </DialogTitle>

        <Button type="reset" size="icon" variant="ghost" class="!h-auto !w-auto !p-1" @click="toggleDialog">
          <Icon name="hugeicons:cancel-01" class="text-xl" />
        </Button>
      </DialogHeader>

      <div class="border-b border-neutral-300 dark:border-netural-600"></div>
      <form @submit="onSubmit" class="w-full grid grid-cols-1 gap-4">
        <TaskForm />

        <DialogFooter>
          <Button type="submit" :disabled="isSubmitting">
            <Icon
              :name="isSubmitting ? 'hugeicons:loading-03' : 'hugeicons:checkmark-square-03'"
              class="text-lg"
              :class="{
                'animate-spin': isSubmitting,
              }"
            />
            حفظ
          </Button>

          <Button type="reset" @click="toggleDialog" variant="outline" :disabled="isSubmitting">
            <Icon name="hugeicons:cancel-square" class="text-lg" />
            إلغاء
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

<style scoped></style>
