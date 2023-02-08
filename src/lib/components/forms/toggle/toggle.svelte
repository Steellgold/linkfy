<script lang="ts">
  import type { ToggleProps } from ".";

  export let props: ToggleProps = {
    label: "Toggle me",
    checked: false,
    disabled: false
  };

  export let checked: boolean = props.checked || false;

  function update(event: Event) {
    const target = event.target as HTMLInputElement;
    checked = target.checked;
  }
</script>

<label class="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" class="sr-only peer" disabled={props.disabled} checked={props.checked} on:change={update} on:change />
  <div class="w-11 h-6 peer-focus:outline-none rounded-full peer bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-600 peer-checked:bg-blue-600"></div>
  <span class="ml-3 text-sm font-medium text-gray-300">{props.label}</span>
</label>