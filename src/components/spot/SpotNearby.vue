<script setup lang="ts">
import { Spot } from "@/models/spot.model";

const props = defineProps<{
  spot: Spot;
}>();
</script>

<template>
  <div>
    <h2>A proximité</h2>
  </div>
</template>

<style scoped lang="scss"></style>
