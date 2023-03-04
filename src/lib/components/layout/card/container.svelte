<script lang="ts">
  export let cards: number = 1;
  export let cardsSm: number = 2;
</script>

<div class="grid grid-cols-{cards} sm:grid-cols-{cardsSm} gap-4 px-4 mx-auto max-w-screen-xl lg:px-12 pt-4">
  <slot />
</div>