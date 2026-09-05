import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthService } from './core/auth/auth.service';

describe('AppComponent', () => {
  const authMock = {
    loading: signal(false),
    authenticated: signal(false),
    user: signal(null),
    initialize: jasmine.createSpy('initialize').and.resolveTo(),
    login: jasmine.createSpy('login').and.resolveTo(),
    logout: jasmine.createSpy('logout').and.resolveTo(),
    registrationUrl: jasmine.createSpy('registrationUrl').and.returnValue('/register')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: authMock }
      ]
    }).compileComponents();
  });

  it('creates the application shell', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
    expect(authMock.initialize).toHaveBeenCalled();
  });
});
