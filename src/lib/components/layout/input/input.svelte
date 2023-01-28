<script lang="ts">
  import { sizeClass, widthClass, type InputProps } from ".";

  export const props: InputProps = {
    type: "text",
    placeholder: "Optional placeholder",
    value: "",
    label: "",
    disabled: false,
    readonly: false,
    required: false,
    autofocus: false,

    id: Math.random().toString(36).substring(7),
    name: "",

    size: "small",
    width: "full",
  };

  export let value: string;
  let id: string = props.id || Math.random().toString(36).substring(7);

  function update(event: Event) {
    const target = event.target as HTMLInputElement;
    value = target.value;
  }
</script>

{#if props.label}
  <label for={id} class="block mb-2 text-sm font-medium text-white">{props.label}</label>
{/if}

<input
  type={props.type}
  id={id}
  name={props.name}
  class="border {sizeClass[props.size]} rounded-lg block {widthClass[props.width]} p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
  placeholder={props.placeholder}
  disabled={props.disabled}
  readonly={props.readonly}
  required={props.required}
  autofocus={props.autofocus}
  on:input={update}
/>