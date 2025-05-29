<script lang="ts">
  // import { i18nStore } from "../../../i18n/i18n";
  import Card from "@smui/card";

  // TODO: Fetch open loans data
  const openLoans = [];
</script>

<div class="open-container">
  <header class="page-header">
    <h1>Open Loans</h1>
  </header>

  <div class="loans-grid">
    <!-- TODO: Add open loans list -->
  </div>
</div>

<style lang="scss">
  .open-container {
    padding: var(--spacing-md);
    min-height: 100vh;
    background-color: #f5f5f5;
  }

  .page-header {
    margin-bottom: var(--spacing-xl);
    
    h1 {
      color: var(--color-text);
      font-size: 2rem;
      font-weight: 500;
    }
  }

  .loans-grid {
    display: grid;
    gap: var(--spacing-md);
    max-width: 1200px;
    margin: 0 auto;
  }
</style>