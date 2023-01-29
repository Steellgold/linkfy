<script lang="ts">
  import { disabledClass, sizeClass, widthClass, type InputProps } from ".";

  export let props: InputProps = {
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

  let disabled: string;
  if (props.disabled) disabled = disabledClass["true"]; else disabled = disabledClass["false"];

  function update(event: Event) {
    const target = event.target as HTMLInputElement;
    value = target.value;
  }
</script>

{#if props.label}
  <label for={props.id} class="block mb-2 text-sm font-medium text-white">{props.label}</label>
{/if}

<!-- border sm:text-sm rounded-lg block p-2.5 text-white w-full bg-gray-800 border-gray-700 placeholder-gray-500 -->
<input
  type={props.type}
  id={props.id}
  name={props.name}
  class="border {sizeClass[props.size]} rounded-lg block p-2.5 text-white {widthClass[props.width]} outline-none focus:ring-1 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
  placeholder={props.placeholder}
  disabled={props.disabled}
  readonly={props.readonly}
  required={props.required}
  autofocus={props.autofocus}
  on:input={update}
  on:input
/>