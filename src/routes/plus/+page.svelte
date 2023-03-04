<script>
  import { CardContainer, CardText, CardTitle, LinkCard, SimpleCard } from "$lib/components/layout/card";
</script>

<div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-10 lg:px-12">
  <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-white">
    Need <span class="pro">+</span> to do <span class="pro">+</span> ?
  </h1>
  <p class="text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-400">Shrink and customize your links, track the performance of your campaigns, and manage your URLs easily with our professional link shrinking tool.</p>
</div>

<CardContainer cardsSm={2} >
  <LinkCard link="/plus/style">
    <CardTitle>Have some style</CardTitle>
    <CardText>Change the redirection URL of your links to make them more attractive and easier to remember.</CardText>
  </LinkCard>

  <SimpleCard>
    <CardTitle>Display your signature</CardTitle>
    <CardText>Show who you are, a subdomain is offered to differentiate and increase linkability<span class="text-gray-400 text-base">*</span></CardText>
  </SimpleCard>

  <SimpleCard>
    <CardTitle>Track your links</CardTitle>
    <CardText>Track the number of clicks, as well as the countries and browsers used to access your links.</CardText>
  </SimpleCard>
  
  <LinkCard link="/plus/options">
    <CardTitle>Gain of options</CardTitle>
    <CardText>Additional options, like choosing the expiration time of your links, or the number of limited redirects.</CardText>
  </LinkCard>
</CardContainer>

<div class="mx-auto max-w-screen-xl text-center lg:px-12 px-3">
  <p class="text-center text-gray-400 text-sm mt-4">* "increase linkability" means, if a link with slug "john" is already taken, nobody can take it without having subdomains because it is not the same URL.</p>
</div>