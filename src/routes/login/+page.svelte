<script lang="ts">
  import { i18nStore } from '../../i18n/i18n';
  import Button from '@smui/button';
  import Card from '@smui/card';
  
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
  <Card class="login-card">
    <div class="login-content">
      <h1>{$i18nStore.t('login.title')}</h1>
      
      <form on:submit|preventDefault={handleSubmit}>
        <div class="form-field">
          <label for="email">{$i18nStore.t('login.email')}</label>
          <input 
            type="email" 
            id="email"
            bind:value={email}
            required
            autocomplete="email"
          />
        </div>

        <div class="form-field">
          <label for="password">{$i18nStore.t('login.password')}</label>
          <input 
            type="password" 
            id="password"
            bind:value={password}
            required
            autocomplete="current-password"
          />
        </div>

        <Button 
          class="login-button"
          variant="raised"
          type="submit"
          disabled={isLoading}
        >
          {$i18nStore.t('login.submit')}
        </Button>
      </form>
    </div>
  </Card>
</div>

<style lang="scss">
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: var(--spacing-md);
    background-color: var(--color-primary);
  }

  .login-card {
    width: 100%;
    max-width: 400px;
    padding: var(--spacing-lg);
    border-radius: 8px;
  }

  .login-content {
    h1 {
      margin: 0 0 var(--spacing-lg);
      text-align: center;
      color: var(--color-text);
    }
  }

  .form-field {
    margin-bottom: var(--spacing-md);

    label {
      display: block;
      margin-bottom: var(--spacing-xs);
      color: var(--color-text);
    }

    input {
      width: 100%;
      padding: var(--spacing-sm);
      border: 1px solid #ccc;
      border-radius: 4px;
      font-family: var(--font-family);
      font-size: 16px;

      &:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 2px rgba(178, 223, 219, 0.2);
      }
    }
  }

  .login-button {
    width: 100%;
    margin-top: var(--spacing-lg);
    background-color: var(--color-primary) !important;
    color: var(--color-text) !important;
  }

  @media (min-width: 768px) {
    .login-card {
      padding: var(--spacing-xl);
    }
  }
</style>