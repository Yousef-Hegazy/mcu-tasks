<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { DropdownMenuContentProps } from "radix-vue";
import type { HTMLAttributes } from "vue";

defineProps<{
  label?: string;
  contentProps?: DropdownMenuContentProps & HTMLAttributes["class"];
}>();
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <slot name="trigger"></slot>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56" :class="contentProps.class" v-bind="contentProps">
      <DropdownMenuLabel v-if="label">{{ label }}</DropdownMenuLabel>
      <slot name="items"></slot>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
