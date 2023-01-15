<script lang="ts">
  import clsx from "clsx";

  export let type: "url" | "text" = "url";
  export let disabled: boolean = false;
  export let size: "large" | "default" = "default";
  export let placeholder: string = "";
  export let id: string = "";
  export let value: string;

  if (id === "") id = Math.random().toString(36).substring(7);

  const sizeClass = clsx({"w-full": size === "large", "": size === "default"});

  const byDisabled = clsx({
    "outline-none focus:ring-1 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500": disabled == false,
    "bg-gray-800 border-gray-700 placeholder-gray-500": disabled == true,
  });

  function changeValue(event: Event) {
    const target = event.target as HTMLInputElement;
    value = target.value;
  }
</script>

<input type={type} disabled={disabled} id={id} class="border sm:text-sm rounded-lg block p-2.5 text-white {sizeClass} {byDisabled}" placeholder={placeholder} on:input={changeValue}>