<script setup lang="ts">
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
</script>

<template>
  <FormField v-slot="{ componentField }" name="title">
    <FormItem>
      <FormLabel class="font-semibold text-neutral-700 dark:text-neutral-400">العنوان</FormLabel>
      <FormControl>
        <Input class="peer" type="text" v-bind="componentField" />
      </FormControl>
      <FormMessage class="text-rose-600 text-xs" />
    </FormItem>
  </FormField>

  <FormField v-slot="{ componentField }" name="description">
    <FormItem>
      <FormLabel class="font-semibold text-neutral-700 dark:text-neutral-400">الوصف</FormLabel>
      <FormControl>
        <Textarea type="text" v-bind="componentField" />
      </FormControl>
      <FormMessage class="text-rose-600 text-xs" />
    </FormItem>
  </FormField>

  <FormField v-slot="{ componentField }" name="issuer">
    <FormItem>
      <FormLabel class="font-semibold text-neutral-700 dark:text-neutral-400">مقدم الطلب</FormLabel>
      <FormControl>
        <Input type="text" v-bind="componentField" />
      </FormControl>
      <FormMessage class="text-rose-600 text-xs" />
    </FormItem>
  </FormField>
</template>

<style scoped></style>
