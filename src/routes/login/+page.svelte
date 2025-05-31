<script lang="ts">
  import { i18nStore } from '../../i18n/i18n';
  
  let email = '';
  let password = '';
  let isLoading = false;

  async function handleSubmit() {
    isLoading = true;
    // TODO: Implement login logic
    isLoading = false;
  }
</script>

<div class="login-container">
  <div class="card bg-base-100 shadow-xl w-full max-w-md">
    <div class="card-body">
      <h1 class="text-2xl font-medium text-center mb-6">{$i18nStore.t('login.title')}</h1>
      
      <form on:submit|preventDefault={handleSubmit}>
        <div class="form-control w-full mb-4">
          <label for="email" class="label">
            <span class="label-text">{$i18nStore.t('login.email')}</span>
          </label>
          <input 
            type="email" 
            id="email"
            bind:value={email}
            required
            autocomplete="email"
            class="input input-bordered w-full"
          />
        </div>

        <div class="form-control w-full mb-6">
          <label for="password" class="label">
            <span class="label-text">{$i18nStore.t('login.password')}</span>
          </label>
          <input 
            type="password" 
            id="password"
            bind:value={password}
            required
            autocomplete="current-password"
            class="input input-bordered w-full"
          />
        </div>

        <button 
          class="btn btn-primary w-full"
          type="submit"
          disabled={isLoading}
        >
          {$i18nStore.t('login.submit')}
        </button>
      </form>
    </div>
  </div>
</div>

<style lang="scss">
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: var(--spacing-md);
    @apply bg-primary/10; // Using Tailwind's opacity modifier for primary color
  }
</style>