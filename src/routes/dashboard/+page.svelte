<script lang="ts">
  import { i18nStore } from "../../i18n/i18n";
  import Card from "@smui/card";
  import { authStore } from "$lib/stores/auth";
  import { goto } from "$app/navigation";
  import type { User } from 'firebase/auth';

  // Cast the store value to User type when using it
  $: name = ($authStore as User)?.displayName ?? "User";
  $: email = ($authStore as User)?.email ?? "";
  
  const stats = {
    overview: {
      total: "250,000 XAF",
      count: 12
    },
    paid: {
      total: "150,000 XAF",
      count: 8
    },
    open: {
      total: "100,000 XAF",
      count: 4
    }
  };

  function handleCardClick(path: string): void {
    switch (path) {
        case 'paid':
            goto('/paidloans');
            break;
        case 'open':
            goto('/openloans');
            break;
        case 'overview':
            // Stay on dashboard for overview
            break;
    }
  }

  // Handle keyboard events
  function handleKeydown(event: KeyboardEvent, path: string): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCardClick(path);
    }
  }
</script>

<div class="dashboard-container">
  <header class="dashboard-header">
    <h1>{$i18nStore.t("dashboard.title")}</h1>
    <div class="user-info">
      <p class="welcome-text">{$i18nStore.t("dashboard.welcome", { name })}</p>
      <p class="email-text">{email}</p>
    </div>
  </header>

  <div class="dashboard-grid">
    <div 
      class="dashboard-card overview-card"
      role="button"
      tabindex={0}
      on:click={() => handleCardClick('overview')}
      on:keydown={(event) => handleKeydown(event, 'overview')}
    >
      <Card>
        <div class="card-content">
          <div class="card-header">
            <h2>{$i18nStore.t("dashboard.overview")}</h2>
            <span class="card-icon" aria-hidden="true">📊</span>
          </div>
          <div class="stats">
            <div class="stat-item">
              <span class="stat-value">{stats.overview.total}</span>
              <span class="stat-label">{$i18nStore.t("dashboard.totalAmount")}</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{stats.overview.count}</span>
              <span class="stat-label">{$i18nStore.t("dashboard.totalLoans")}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>

    <div 
      class="dashboard-card paid-card"
      role="button"
      tabindex={0}
      on:click={() => handleCardClick('paid')}
      on:keydown={(event) => handleKeydown(event, 'paid')}
    >
      <Card>
        <div class="card-content">
          <div class="card-header">
            <h2>{$i18nStore.t("dashboard.paid")}</h2>
            <span class="card-icon" aria-hidden="true">✅</span>
          </div>
          <div class="stats">
            <div class="stat-item">
              <span class="stat-value">{stats.paid.total}</span>
              <span class="stat-label">{$i18nStore.t("dashboard.paidAmount")}</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{stats.paid.count}</span>
              <span class="stat-label">{$i18nStore.t("dashboard.paidLoans")}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>

    <div 
      class="dashboard-card open-card"
      role="button"
      tabindex={0}
      on:click={() => handleCardClick('open')}
      on:keydown={(event) => handleKeydown(event, 'open')}
    >
      <Card>
        <div class="card-content">
          <div class="card-header">
            <h2>{$i18nStore.t("dashboard.open")}</h2>
            <span class="card-icon" aria-hidden="true">⏳</span>
          </div>
          <div class="stats">
            <div class="stat-item">
              <span class="stat-value">{stats.open.total}</span>
              <span class="stat-label">{$i18nStore.t("dashboard.outstandingAmount")}</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{stats.open.count}</span>
              <span class="stat-label">{$i18nStore.t("dashboard.openLoans")}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
</div>

<style lang="scss">
  .dashboard-container {
    padding: var(--spacing-md);
    min-height: 100vh;
    background-color: #f5f5f5;
  }

  .dashboard-header {
    margin-bottom: var(--spacing-xl);
    text-align: center;
    
    h1 {
      margin: 0;
      color: var(--color-text);
      font-size: 2rem;
      font-weight: 500;
    }

    .user-info {
      margin-top: var(--spacing-sm);
    }

    .welcome-text {
      margin: var(--spacing-xs) 0 0;
      color: var(--color-text);
      font-weight: 500;
    }

    .email-text {
      margin: var(--spacing-xs) 0 0;
      color: var(--color-text);
      opacity: 0.7;
      font-size: 0.875rem;
    }
  }

  .dashboard-grid {
    display: grid;
    gap: var(--spacing-md);
    max-width: 1200px;
    margin: 0 auto;
  }

  :global(.dashboard-card) {
    background: white;
    border-radius: 12px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    cursor: pointer;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    &:active {
      transform: translateY(0);
    }

    // Focus styles for accessibility
    &:focus {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }

    &:focus:not(:focus-visible) {
      outline: none;
    }
  }

  .card-content {
    padding: var(--spacing-lg);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-md);

    h2 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 500;
      color: var(--color-text);
    }

    .card-icon {
      font-size: 1.5rem;
    }
  }

  .stats {
    display: grid;
    gap: var(--spacing-md);
  }

  .stat-item {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  .stat-value {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--color-primary);
  }

  .stat-label {
    font-size: 0.875rem;
    color: var(--color-text);
    opacity: 0.7;
  }

  // Specific card styles
  :global(.overview-card) {
    border-left: 4px solid var(--color-blue);
  }

  :global(.paid-card) {
    border-left: 4px solid var(--color-primary);
  }

  :global(.open-card) {
    border-left: 4px solid var(--color-warning);
  }

  @media (min-width: 640px) {
    .stats {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (min-width: 768px) {
    .dashboard-container {
      padding: var(--spacing-xl);
    }

    .dashboard-grid {
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
  }

  @media (min-width: 1024px) {
    .dashboard-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>