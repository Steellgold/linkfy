<script lang="ts">
  import { Navbar } from "$lib/components/layout/navbar";
  import "../app.css"
</script>

<section>
  <div class="absolute top-[-30%] bottom-0 right-0 left-0 w-full h-[75%] bg-gradient-to-b from-gray-800 to-transparent skew-y-[-10deg] transform-origin-top-left overflow-hidden -z-1"></div>

  <div class="relative">
    <Navbar />
    
    <slot />
  </div>
</section>