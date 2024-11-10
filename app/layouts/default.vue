<script setup lang="ts">
const { locale, t } = useI18n();

const getDir = computed<"rtl" | "ltr">(() => (locale.value === "ar" ? "rtl" : "ltr"));

const fontFamily = computed(() => {
  // Apply different fonts based on language
  if (locale.value === "ar") {
    return "'Noto Sans Arabic', serif"; // Arabic font
  } else {
    return "'Noto Sans', sans-serif"; // Default font for English and others
  }
});

useServerHead({
  title: t("title"),
  htmlAttrs: {
    lang: locale,
    dir: getDir.value,
  },
  style: [
    {
      children: `
        body {
          font-family: ${fontFamily.value};
        }
      `,
    },
  ],
});
</script>

<template>
  <div class="w-full">
    <nav class="flex flex-row items-center p-4 shadow-lg justify-between">
      <NuxtLinkLocale to="/" class="text-xl font-bold">
        {{ $t("title") }}
      </NuxtLinkLocale>

      <AppTooltip :title="t('downloadReport')">
        <Button size="icon">
          <Icon name="hugeicons:google-sheet" class="text-xl" />
        </Button>
      </AppTooltip>
    </nav>
    <main class="w-full max-w-7xl mx-auto my-8">
      <slot />
    </main>
  </div>
</template>

<style>
html,
body {
  @apply h-full;
}

#__nuxt {
  @apply h-full;
}
</style>
