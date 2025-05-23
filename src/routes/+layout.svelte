<script lang="ts">
  import "../i18n/i18n";
  import "../theme/theme.scss";
  import "../styles/index.scss";
  import { authStore } from "$lib/stores/auth";
  import { browser } from "$app/environment";

  if (browser) {
    authStore.init();
  }
</script>

<slot />
