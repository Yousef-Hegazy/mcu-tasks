<script setup lang="ts">
import type { Task } from "~~/models/Task";

const tableHeads = ["number", "title", "description", "status", "issuer"];
const tasks: Task[] = [
  {
    id: 1,
    title: "وظيفة 1",
    description: "وصف 1",
    isFinished: false,
    issuerName: "مستخدم 1",
  },
];
</script>

<template></template>

<style scoped></style>
