<script lang="ts">
  export let checked: boolean = false;
  export let disabled: boolean = false;
  export let ariaLabel: string = "";
  export let required: boolean = false;

  let id = Math.random().toString(36).substr(2, 9);
</script>

<div class="flex items-start">
  <div class="flex items-center h-5">
    <input id={id} aria-describedby={ariaLabel} type="checkbox" class="w-4 h-4 border rounded focus:ring-0 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800" {checked} {disabled} required={required} />
  </div>
  <div class="ml-3 text-sm">
    <label for={id} class="text-gray-500 dark:text-gray-300">
      <slot />
    </label>
  </div>
</div>