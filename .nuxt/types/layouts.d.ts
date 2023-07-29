import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "default" | "panel"
declare module "/Users/emad/Documents/GitHub/components/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}