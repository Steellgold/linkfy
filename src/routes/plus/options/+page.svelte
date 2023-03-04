<script>
    import { CardContainer, CardTitle, SimpleCard } from "$lib/components/layout/card";
    import { IconBarrierBlock, IconBattery3, IconClockEdit, IconKey } from "@tabler/icons-svelte";

</script>
<div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-10 lg:px-12">
  <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-white">
    Need more <span class="pro">options</span> ?
  </h1>
  <p class="text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-400">With a Pro account you unlock additional options for your link generation.</p>
</div>

<CardContainer cardsSm={2} >
  <SimpleCard>
    <CardTitle>
      <IconKey />
      Password protection
    </CardTitle>
  </SimpleCard>

  <SimpleCard>
    <CardTitle>
      <IconClockEdit />
      Expiration
    </CardTitle>
  </SimpleCard>

  <SimpleCard>
    <CardTitle>
      <IconBattery3 />
      Number of redirects <span class="text-gray-400 text-base">*</span>
    </CardTitle>
  </SimpleCard>

  <SimpleCard>
    <CardTitle>
      <IconBarrierBlock />
      Geographical area <span class="text-gray-400 text-base">**</span>
    </CardTitle>
  </SimpleCard>
</CardContainer>

<div class="mx-auto max-w-screen-xl text-center lg:px-12 px-3">
  <p class="text-center text-gray-400 text-sm mt-4">* If you set a maximum of 5 redirects, your link cannot be redirected more than 5 times.</p>
  <p class="text-center text-gray-400 text-sm">** If you set the geographical area to "France", your link can only be used by people located in France.</p>
</div>