<script lang="ts">
  import { i18nStore } from "../../i18n/i18n";
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
      class="dashboard-card overview-card card bg-base-100"
      role="button"
      tabindex={0}
      on:click={() => handleCardClick('overview')}
      on:keydown={(event) => handleKeydown(event, 'overview')}
    >
      <div class="card-body">
        <div class="card-header">
          <h2 class="card-title">{$i18nStore.t("dashboard.overview")}</h2>
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
    </div>

    <div 
      class="dashboard-card paid-card card bg-base-100"
      role="button"
      tabindex={0}
      on:click={() => handleCardClick('paid')}
      on:keydown={(event) => handleKeydown(event, 'paid')}
    >
      <div class="card-body">
        <div class="card-header">
          <h2 class="card-title">{$i18nStore.t("dashboard.paid")}</h2>
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
    </div>

    <div 
      class="dashboard-card open-card card bg-base-100"
      role="button"
      tabindex={0}
      on:click={() => handleCardClick('open')}
      on:keydown={(event) => handleKeydown(event, 'open')}
    >
      <div class="card-body">
        <div class="card-header">
          <h2 class="card-title">{$i18nStore.t("dashboard.open")}</h2>
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
    </div>
  </div>

  <button
    class="fab"
    aria-label="Add new loan"
    on:click={() => {
      // TODO: Implement add new loan functionality
      console.log('Add new loan tapped');
      // alert('Add new loan functionality not implemented yet.'); 
      goto('/newloan'); // Navigate to new loan page
    }}
  >
    <span class="plus-icon" aria-hidden="true">+</span>
  </button>
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
    @apply shadow-lg; // Using Tailwind's shadow instead of custom
    transition: transform 0.2s ease;
    cursor: pointer;
    
    &:hover {
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }

    // Focus styles for accessibility
    &:focus {
      @apply outline-none ring-2 ring-primary ring-offset-2;
    }
  }

  .card-body {
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

  // Update specific card styles
  :global(.overview-card) {
    @apply border-l-4 border-blue-500;
  }

  :global(.paid-card) {
    @apply border-l-4 border-primary;
  }

  :global(.open-card) {
    @apply border-l-4 border-warning;
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

  .fab {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: var(--color-primary);
    border: none;
    color: white;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    z-index: 1000;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(129, 199, 132, 0.5), 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .plus-icon {
      line-height: 1;
      font-weight: 300;
    }
  }

  // Add mobile-specific adjustments
  @media (max-width: 768px) {
    .fab {
      bottom: 1.5rem;
      right: 1.5rem;
    }
  }
</style>