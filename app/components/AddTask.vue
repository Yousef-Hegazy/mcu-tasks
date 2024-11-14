<script setup lang="ts">
const open = ref(false);

const toggleDialog = () => {
  open.value = !open.value;
};
</script>

<template>
  <Dialog :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'" :open="open">
    <!-- <DialogTrigger> -->
    <AppTooltip :title="$t('addTask')">
      <Button size="icon" variant="default" @click="toggleDialog">
        <Icon name="hugeicons:task-add-02" class="text-xl" />
      </Button>
    </AppTooltip>
    <!-- </DialogTrigger> -->

    <DialogContent :disable-outside-pointer-events="true" class="w-full max-w-2xl">
      <DialogHeader class="flex flex-row items-center w-full gap-x-4 justify-between">
        <DialogTitle>
          {{ $t("addTask") }}
        </DialogTitle>

        <Button type="reset" size="icon" variant="ghost" class="!h-auto !w-auto !p-1" @click="toggleDialog">
          <Icon name="hugeicons:cancel-01" class="text-xl" />
        </Button>
      </DialogHeader>

      <div class="border-b border-neutral-300 dark:border-netural-600"></div>

      <TaskForm />

      <DialogFooter>
        <Button type="submit">
          <Icon name="hugeicons:checkmark-square-03" class="text-lg" />
          {{ $t("common.save") }}
        </Button>
        <Button type="reset" @click="toggleDialog" variant="outline" class="">
          <Icon name="hugeicons:cancel-square" class="text-lg" />
          {{ $t("common.cancel") }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<style scoped></style>
