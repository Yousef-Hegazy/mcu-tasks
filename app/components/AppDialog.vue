<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

defineProps<{
  title?: string;
  description?: string;
}>();
</script>

<template>
  <Dialog>
    <DialogTrigger>
      <slot name="trigger"></slot>
    </DialogTrigger>

    <DialogContent>
      <DialogHeader>
        <DialogTitle v-if="title">{{ title }}</DialogTitle>
        <DialogDescription v-if="description"> {{ description }} </DialogDescription>
      </DialogHeader>

      <slot name="body"></slot>

      <DialogFooter>
        <slot name="footer"></slot>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<style scoped></style>
