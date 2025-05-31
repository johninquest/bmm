<script lang="ts">
  import { page } from "$app/stores";
  import { i18nStore } from "../i18n/i18n";
  import { goto } from "$app/navigation";

  /**
   * Navigates the user back to the home page.
   */
  function goHome(): void {
    goto("/");
  }
</script>

<div class="error-container">
  <div class="error-content">
    <h1>{$page.status}</h1>
    <p class="error-message">
      {$page.status === 404 
        ? $i18nStore.t("error.notFound") 
        : $i18nStore.t("error.generic")}
    </p>
    <button 
      class="btn btn-primary w-full mt-6"
      on:click={goHome}
    >
      {$i18nStore.t("error.backHome")}
    </button>
  </div>
</div>

<style lang="scss">
  .error-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: var(--spacing-md);
    background-color: #f5f5f5;
  }

  .error-content {
    text-align: center;
    padding: var(--spacing-xl);
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;

    h1 {
      font-size: 4rem;
      margin: 0;
      color: var(--color-primary);
      line-height: 1;
    }

    .error-message {
      margin: var(--spacing-md) 0;
      color: var(--color-text);
      font-size: 1.125rem;
    }
  }
</style>