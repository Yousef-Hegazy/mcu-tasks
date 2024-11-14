<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const { t } = useI18n();

const formSchema = toTypedSchema(
  z.object({
    title: z.string({ message: t("common.requiredField") }).min(2),
    description: z.string({ message: t("common.requiredField") }).optional(),
    issuer: z.string({ message: t("common.requiredField") }).min(2),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit((values) => {
  console.log("Form submitted!", values);
});
</script>

<template>
  <form @submit="onSubmit" class="w-full grid grid-cols-1 gap-4">
    <FormField v-slot="{ componentField }" name="title">
      <FormItem>
        <FormLabel>{{ $t("task.title") }}</FormLabel>
        <FormControl>
          <Input type="text" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="description">
      <FormItem>
        <FormLabel>{{ $t("task.description") }}</FormLabel>
        <FormControl>
          <Textarea type="text" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="issuer">
      <FormItem>
        <FormLabel>{{ $t("task.issuer") }}</FormLabel>
        <FormControl>
          <Input type="text" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
  </form>
</template>

<style scoped></style>
