<script>
    import { CardContainer, CardTitle, SimpleCard } from "$lib/components/layout/card";
    import { IconDeviceDesktop, IconFlag, IconGraph, IconMathSymbols } from "@tabler/icons-svelte";

</script>
<div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-10 lg:px-12">
  <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-white">
    Track the <span class="pro">clicks</span> !
  </h1>
  <p class="text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-400">With a Pro you unlock the ability to track the clicks on your links.</p>
</div>

<CardContainer >
  <SimpleCard>
    <CardTitle>
      <IconFlag />
      Countries of origin
    </CardTitle>
  </SimpleCard>

  <SimpleCard>
    <CardTitle>
      <IconGraph />
      Activities
    </CardTitle>
  </SimpleCard>

  <SimpleCard>
    <CardTitle>
      <IconDeviceDesktop />
      Devices
    </CardTitle>
  </SimpleCard>

  <SimpleCard>
    <CardTitle>
      <IconMathSymbols />
      Operating systems
    </CardTitle>
  </SimpleCard>
</CardContainer>