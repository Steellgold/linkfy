<script lang="ts">

</script>

<div class="flex items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
  <div class="w-full p-6 rounded-lg shadow border md:mt-0 sm:max-w-md bg-gray-800 border-gray-700 sm:p-8">
    <h1 class="mb-1 text-xl font-bold md:text-2xl text-white">Shorten your links</h1>
    <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
      <div>
        <input type="url" name="shorten" class="border sm:text-sm outline-none rounded-lg block w-full p-2.5 focus:ring-1 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="https://google.com/">
      </div>
      <div class="flex items-center justify-between text-sm font-normal gap-3">
        <input type="url" name="shortened" disabled class="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-800 border-gray-700 placeholder-gray-500" placeholder="https://google.com/">
        <button type="submit" class="text-white focus:ring-2 outline-none font-medium rounded-lg text-sm px-5 py-2.5 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 transition-all ease-in-out 3s">
          <i class="fa-solid fa-copy"></i>
        </button>
      </div>
      <div class="flex items-center justify-between text-sm font-normal gap-3">
      <button type="submit" class="w-full text-white focus:ring-2 outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 transition-all ease-in-out 3s">
        Transform..
      </button>
      <button class="text-white focus:ring-2 outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 transition-all ease-in-out 3s">
        <i class="fa-solid fa-clock-rotate-left"></i>
      </button>
    </div>
    </form>
  </div>
</div>