<script lang="ts">
  import { Navbar } from "$lib/components/layout/navbar";
  import { Toasts } from "$lib/components/layout/toasts";
  import "../app.css"
</script>

<section>
  <div class="absolute top-[-30%] bottom-0 right-0 left-0 w-full h-[75%] bg-gradient-to-b from-gray-800 to-transparent skew-y-[-10deg] transform-origin-top-left overflow-hidden -z-1"></div>

  <div class="relative">
    <Navbar />

    <div class="flex flex-col items-center mx-auto px-3 py-4 lg:py-0 absolute top-5 left-0 right-0">  
      <Toasts />
    </div>
      
    <slot />
  </div>
</section>

<p class="text-center text-gray-500 text-sm mt-4 mb-8 mx-auto max-w-screen-xl">© 2023 - Linkfy</p>