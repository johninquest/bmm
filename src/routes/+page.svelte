<script lang="ts">
  import { i18nStore } from "../i18n/i18n";
  import { goto } from "$app/navigation";
  import { auth } from "../firebase";
  import { signInWithEmailAndPassword, signInWithPopup } from "@firebase/auth";
  import pkg from "../../package.json";
  const appVersion = pkg.version;

  let email = "";
  let password = "";
  let isLoading = false;
  let error = "";

  async function handleSubmit() {
    isLoading = true;
    error = "";

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
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

  /*
  async function handleGoogleLogin() {
    alert("Google login is under construction");
    isLoading = true;
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
    } 
  } */
</script>

<div class="login-container">
  <div class="card bg-base-100 w-full max-w-md shadow-lg">
    <div class="card-body">
      <div class="login-content">
        <h1 class="text-2xl font-medium text-center mb-6">
          {$i18nStore.t("login.title")}
        </h1>

        <form on:submit|preventDefault={handleSubmit}>
          {#if error}
            <div class="alert alert-error mb-4 text-sm">{error}</div>
          {/if}

          <div class="form-control w-full mb-4">
            <label for="email" class="label">
              <span class="label-text">{$i18nStore.t("login.email")}</span>
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
              <span class="label-text">{$i18nStore.t("login.password")}</span>
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
            {$i18nStore.t("login.submit")}
          </button>
        </form>

        <footer class="mt-8 text-center text-xs opacity-60">
          Version {appVersion}
        </footer>
      </div>
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
    background-color: white;
  }

  // Remove most custom styles since we're using DaisyUI classes
  :global(.card) {
    padding: var(--spacing-lg);
    border-radius: 8px;
  }

  @media (min-width: 768px) {
    :global(.card) {
      padding: var(--spacing-xl);
    }
  }
</style>
