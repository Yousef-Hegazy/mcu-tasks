<script setup lang="ts">
const { locale, t } = useI18n();
const switchLocale = useSwitchLocalePath();

const getDir = computed<"rtl" | "ltr">(() => (locale.value === "ar" ? "rtl" : "ltr"));

const fontFamily = computed(() => {
  // Apply different fonts based on language
  if (locale.value === "ar") {
    return "'Noto Sans Arabic', serif"; // Arabic font
  } else {
    return "'Noto Sans', sans-serif"; // Default font for English and others
  }
});

useHead(() => ({
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
}));
</script>

<template>
  <div class="w-full">
    <nav class="flex flex-row items-center p-4 shadow-lg justify-between">
      <NuxtLinkLocale to="/" class="text-xl font-bold">
        {{ $t("title") }}
      </NuxtLinkLocale>

      <ul class="flex flex-row items-center gap-x-4">
        <Button
          size="icon"
          variant="secondary"
          @click="
            $colorMode.preference === 'light' ? ($colorMode.preference = 'dark') : ($colorMode.preference = 'light')
          "
        >
          <Icon :name="$colorMode.preference === 'dark' ? 'hugeicons:sun-02' : 'hugeicons:moon-02'" />
        </Button>

        <AppDropdownMenu
          :label="t('chooseLanguage')"
          :content-props="{
            align: 'end',
            class: 'w-40',
          }"
        >
          <template #trigger>
            <Button size="icon" variant="secondary">
              <Icon name="hugeicons:language-square" class="text-xl" />
            </Button>
          </template>

          <template #items>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuCheckboxItem :checked="locale === 'ar'">
                <SwitchLocalePathLink locale="ar" class="w-full font-notoAR">العربية</SwitchLocalePathLink>
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem :checked="locale === 'en'">
                <SwitchLocalePathLink locale="en" class="w-full font-noto">English</SwitchLocalePathLink>
              </DropdownMenuCheckboxItem>
            </DropdownMenuGroup>
          </template>
        </AppDropdownMenu>
      </ul>
    </nav>
    <main class="w-full max-w-7xl mx-auto p-4">
      <slot></slot>
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
