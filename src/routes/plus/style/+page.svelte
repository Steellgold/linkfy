<script>
    import { CardContainer, CardTitle, SimpleCard } from "$lib/components/layout/card";
    import { IconAbc, IconSignature } from "@tabler/icons-svelte";

</script>
<div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-10 lg:px-12">
  <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-white">
    Display your <span class="pro">signature</span> !
  </h1>
  <p class="text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-400">With a Pro you unlock additional customization of your links, to be more attractive and easier to remember.</p>
</div>

<CardContainer >
  <SimpleCard>
    <CardTitle>
      <IconSignature />
      Custom subdomain
    </CardTitle>
  </SimpleCard>

  <SimpleCard>
    <CardTitle>
      <IconAbc />
      Own slug
    </CardTitle>
  </SimpleCard>
</CardContainer>