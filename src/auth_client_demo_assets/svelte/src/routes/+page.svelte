<script>
  import LoggedIn from "../components/LoggedIn.svelte";
  import LoggedOut from "../components/LoggedOut.svelte";
  import { auth } from "../stores/auth";
</script>

<main>
  {#if $auth.isAuthenticated}
    <LoggedIn />
  {:else}
    <LoggedOut />
  {/if}
</main>
