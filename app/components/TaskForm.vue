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
    titleAr: z.string({ message: t("common.requiredField") }).min(2),
    titleEn: z.string({ message: t("common.requiredField") }).min(2),
    descriptionAr: z.string({ message: t("common.requiredField") }).optional(),
    descriptionEn: z.string({ message: t("common.requiredField") }).optional(),
    issuerAr: z.string({ message: t("common.requiredField") }).min(2),
    issuerEn: z.string({ message: t("common.requiredField") }).min(2),
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
  <form @submit="onSubmit" class="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
    <FormField v-slot="{ componentField }" name="titleAr">
      <FormItem>
        <FormLabel>{{ $t("task.titleAr") }}</FormLabel>
        <FormControl>
          <Input type="text" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="titleEn">
      <FormItem>
        <FormLabel>{{ $t("task.titleEn") }}</FormLabel>
        <FormControl>
          <Input type="text" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="descriptionAr">
      <FormItem>
        <FormLabel>{{ $t("task.descriptionAr") }}</FormLabel>
        <FormControl>
          <Textarea type="text" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="descriptionEn">
      <FormItem>
        <FormLabel>{{ $t("task.descriptionEn") }}</FormLabel>
        <FormControl>
          <Textarea type="text" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="issuerAr">
      <FormItem>
        <FormLabel>{{ $t("task.issuerAr") }}</FormLabel>
        <FormControl>
          <Input type="text" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="issuerEn">
      <FormItem>
        <FormLabel>{{ $t("task.issuerEn") }}</FormLabel>
        <FormControl>
          <Input type="text" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
  </form>
</template>

<style scoped></style>
