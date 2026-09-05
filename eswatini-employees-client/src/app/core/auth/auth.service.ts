import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserManager, WebStorageStateStore } from 'oidc-client-ts';
import { appConfig } from '../config/app-config';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly router = inject(Router);
  private readonly returnUrlKey = 'angular.returnUrl';
  private readonly userManager = new UserManager({
    authority: appConfig.identityServer.authority,
    client_id: appConfig.identityServer.clientId,
    redirect_uri: `${window.location.origin}/auth/callback`,
    post_logout_redirect_uri: `${window.location.origin}/`,
    response_type: 'code',
    scope: 'openid profile address roles country eswatiniemployeeapi.scope',
    automaticSilentRenew: true,
    userStore: new WebStorageStateStore({ store: window.localStorage })
  });

  readonly user = signal<User | null>(null);
  readonly authenticated = computed(() => {
    const user = this.user();
    return !!user && !user.expired;
  });
  readonly loading = signal(true);

  constructor() {
    this.userManager.events.addUserLoaded((user) => this.user.set(user));
    this.userManager.events.addUserUnloaded(() => this.user.set(null));
    this.userManager.events.addUserSignedOut(() => this.user.set(null));
  }

  async initialize(): Promise<void> {
    try {
      if (window.location.pathname === '/auth/callback') {
        const user = await this.userManager.signinRedirectCallback();
        this.user.set(user);
        const returnUrl = sessionStorage.getItem(this.returnUrlKey) ?? '/';
        sessionStorage.removeItem(this.returnUrlKey);
        await this.router.navigateByUrl(this.safeReturnUrl(returnUrl), { replaceUrl: true });
      } else {
        await this.loadCurrentUser();
      }
    } finally {
      this.loading.set(false);
    }
  }

  async login(returnUrl = `${window.location.pathname}${window.location.search}`): Promise<void> {
    sessionStorage.setItem(this.returnUrlKey, this.safeReturnUrl(returnUrl));
    await this.userManager.signinRedirect();
  }

  async logout(): Promise<void> {
    const user = await this.userManager.getUser();
    await this.userManager.removeUser();
    this.user.set(null);
    sessionStorage.removeItem(this.returnUrlKey);
    await this.userManager.signoutRedirect({
      id_token_hint: user?.id_token,
      post_logout_redirect_uri: `${window.location.origin}/`
    });
  }

  registrationUrl(returnUrl = `${window.location.origin}/`): string {
    return `${appConfig.identityServer.authority}/Account/Register/Register?returnUrl=${encodeURIComponent(returnUrl)}`;
  }

  async accessToken(): Promise<string | null> {
    const user = await this.loadCurrentUser();
    return user?.access_token ?? null;
  }

  private async loadCurrentUser(): Promise<User | null> {
    const user = await this.userManager.getUser();
    if (!user || user.expired) {
      if (user) await this.userManager.removeUser();
      this.user.set(null);
      return null;
    }

    this.user.set(user);
    return user;
  }

  private safeReturnUrl(returnUrl: string): string {
    if (!returnUrl.startsWith('/') || returnUrl.startsWith('//')) return '/';
    return returnUrl;
  }
}
