<script setup lang="ts">
import Toaster from "@/components/ui/toast/Toaster.vue";

// const fontFamily = computed(() => {
//   // Apply different fonts based on language
//   if (locale.value === "ar") {
//     return "'Noto Sans Arabic', serif"; // Arabic font
//   } else {
//     return "'Noto Sans', sans-serif"; // Default font for English and others
//   }
// });

useHead({
  title: "طلبات عمل المحايد",
  htmlAttrs: {
    lang: "ar",
    dir: "rtl",
  },
  style: [
    {
      children: `
        body {
          font-family: 'Noto Sans Arabic', serif;
        }
      `,
    },
  ],
});
</script>

<template>
  <div class="w-full max-w-7xl mx-auto">
    <nav
      class="flex flex-row items-center p-4 shadow-lg justify-between rounded-b-lg border-b border-neutral-300 dark:border-neutral-600"
    >
      <NuxtLinkLocale to="/" class="text-xl font-bold"> طلبات عمل المحايد </NuxtLinkLocale>

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

        <!-- <AppDropdownMenu
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
        </AppDropdownMenu> -->
      </ul>
    </nav>
    <main class="w-full p-4 mt-4">
      <slot></slot>
    </main>

    <Toaster />
  </div>
</template>

<style>
html,
body {
  height: 100%;
}

#__nuxt {
  height: 100%;
}
</style>
