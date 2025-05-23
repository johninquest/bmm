<script lang="ts">
  import { i18nStore } from "../i18n/i18n";
  import { goto } from "$app/navigation";
  import Button from "@smui/button";
  import Card from "@smui/card";
  import { auth, googleProvider } from "../firebase";
  import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
  import { browser } from "$app/environment";

  let email = "";
  let password = "";
  let isLoading = false;
  let error = "";

  async function handleSubmit() {
    isLoading = true;
    error = "";
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        await goto("/dashboard");
      }
    } catch (e) {
      console.error("Login failed:", e);
      error = $i18nStore.t("login.error");
    } finally {
      isLoading = false;
    }
  }

  async function handleGoogleLogin() {
    alert("Google login is under construction");
/*     isLoading = true;
    error = "";
    
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        await goto("/dashboard");
      }
    } catch (e) {
      console.error("Google login failed:", e);
      error = $i18nStore.t("login.error");
    } finally {
      isLoading = false;
    } */
  }
</script>

<div class="login-container">
  <Card class="login-card card">
    <div class="login-content">
      <h1>{$i18nStore.t("login.title")}</h1>

      <form on:submit|preventDefault={handleSubmit}>
        {#if error}
          <div class="error-message">{error}</div>
        {/if}

        <div class="form-field">
          <label for="email">{$i18nStore.t("login.email")}</label>
          <input
            type="email"
            id="email"
            bind:value={email}
            required
            autocomplete="email"
          />
        </div>

        <div class="form-field">
          <label for="password">{$i18nStore.t("login.password")}</label>
          <input
            type="password"
            id="password"
            bind:value={password}
            required
            autocomplete="current-password"
          />
        </div>

        <Button
          class="login-button button"
          variant="raised"
          type="submit"
          disabled={isLoading}
        >
          {$i18nStore.t("login.submit")}
        </Button>

        <div class="divider">
          <span>or</span>
        </div>

        <Button
          class="google-button button"
          variant="outlined"
          on:click={handleGoogleLogin}
          disabled={isLoading}
        >
          <img
            src={browser ? "/google-logo.svg" : ""}
            alt="Google"
            class="google-icon"
          />
          Continue with Google
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
    background-color: white;
  }

  :global(.login-card) {
    width: 100%;
    max-width: 400px;
    padding: var(--spacing-lg);
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .login-content {
    h1 {
      margin: 0 0 var(--spacing-lg);
      text-align: center;
      color: var(--color-text);
      font-weight: 500;
    }
  }

  .form-field {
    margin-bottom: var(--spacing-md);

    label {
      display: block;
      margin-bottom: var(--spacing-xs);
      color: var(--color-text);
      font-weight: 500;
    }

    input {
      width: 100%;
      padding: var(--spacing-sm);
      border: 1px solid #ccc;
      border-radius: 4px;
      font-family: var(--font-family);
      font-size: 16px;
      transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease;

      &:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 2px rgba(178, 223, 219, 0.2);
      }

      &:hover {
        border-color: var(--color-primary);
      }
    }
  }

  :global(.login-button) {
    width: 100%;
    margin-top: var(--spacing-lg);
    background-color: var(--color-primary) !important;
    color: var(--color-text) !important;
    font-weight: 500;
    height: 48px !important;
    border-radius: 4px !important; // Match input field border-radius
    font-size: 1rem !important;
    letter-spacing: 0.5px;
    text-transform: none !important;
    transition: opacity 0.2s ease;
    box-shadow: none !important; // Remove shadow

    &:hover:not(:disabled) {
      opacity: 0.9;
      transform: none; // Remove transform
    }

    &:active:not(:disabled) {
      transform: none; // Remove transform
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }

  .error-message {
    background-color: #ffebee;
    color: #c62828;
    padding: var(--spacing-sm);
    border-radius: 4px;
    margin-bottom: var(--spacing-md);
    font-size: 0.875rem;
  }

  .divider {
    position: relative;
    text-align: center;
    margin: var(--spacing-xl) 0;

    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      width: calc(50% - 30px);
      height: 1px;
      background-color: #ccc;
    }

    &::before {
      left: 0;
    }

    &::after {
      right: 0;
    }

    span {
      background-color: white;
      padding: 0 var(--spacing-sm);
      color: #666;
      font-size: 0.875rem;
    }
  }

  :global(.google-button) {
    width: 100%;
    background-color: white !important;
    color: var(--color-text) !important;
    border: 1px solid #ccc !important;
    font-weight: 500;
    height: 48px !important;
    border-radius: 4px !important;
    font-size: 1rem !important;
    letter-spacing: 0.5px;
    text-transform: none !important;
    transition: background-color 0.2s ease;
    box-shadow: none !important;
    display: flex !important;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-sm);

    &:hover:not(:disabled) {
      background-color: #f5f5f5 !important;
    }

    &:active:not(:disabled) {
      background-color: #eee !important;
    }
  }

  .google-icon {
    width: 18px;
    height: 18px;
  }

  @media (min-width: 768px) {
    :global(.login-card) {
      padding: var(--spacing-xl);
    }

    .form-field {
      margin-bottom: var(--spacing-lg);
    }
  }
</style>
