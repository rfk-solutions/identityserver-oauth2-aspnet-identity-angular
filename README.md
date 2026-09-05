# 🚀 EswatiniEmployees — Angular + Duende IdentityServer OAuth Solution

[![.NET](https://img.shields.io/badge/.NET-8.0%2B-512BD4?logo=dotnet&logoColor=white)](https://dotnet.microsoft.com/)
[![Duende IdentityServer](https://img.shields.io/badge/Auth-Duende_IdentityServer-000000?logo=security&logoColor=white)](https://duendesoftware.com/)
[![SQL Server](https://img.shields.io/badge/Database-SQL%20Server-CC2927?logo=microsoftsqlserver&logoColor=white)](https://www.microsoft.com/sql-server/)
[![Angular](https://img.shields.io/badge/Angular-19-DD0031?logo=angular&logoColor=white)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A comprehensive OAuth 2.0 and OpenID Connect (OIDC) implementation using **Duende IdentityServer**, **ASP.NET Core Identity**, and an **Angular 19** client. The primary browser application is the Angular single-page app in `eswatini-employees-client`, written in TypeScript and using `oidc-client-ts` with the Authorization Code flow and PKCE to authenticate users and call the secured ASP.NET Web API. An optional ASP.NET Core client is also included for server-rendered client scenarios.

---

## 🌐 Live Demo

**[View Live API Demo](https://eswatini-employees-client-fyfdd5d5djfee4a7.southafricanorth-01.azurewebsites.net)**

> The demo is hosted on Microsoft Azure.
---

## ✨ Features

* ⚡ **Duende IdentityServer Configuration:** Fully configured for OIDC and OAuth 2.0.
* 🔐 **ASP.NET Core Identity Integration:** Complete user management with Entity Framework Core.
* 🛡️ **Authorization Code Flow with PKCE:** Secure authentication pattern for interactive clients.
* 🔑 **JWT & Cookie Authentication:** Bearer token validation for APIs and cookie auth for UI clients.
* 🌐 **External Identity Providers:** Pre-configured Google Authentication integration.
* 📧 **Email Service Verification:** Built-in email sender for account confirmation and password resets.
* 🗄️ **Entity Framework Core:** Operational and Configuration data stores for IdentityServer.
* 🅰️ **Angular 19 Client:** TypeScript single-page application in `eswatini-employees-client` using `oidc-client-ts` and PKCE.
* 🏗️ **Multi-Project Architecture:** Clean separation of IDP, Angular client, optional ASP.NET client, API, and Email services.

---

## 🛠️ Technology Stack

| Technology               | Purpose                                |
| ------------------------ | -------------------------------------- |
| .NET                     | Core framework                         |
| Duende.IdentityServer    | OpenID Connect & OAuth 2.0 framework   |
| ASP.NET Core Identity    | User membership and login              |
| Entity Framework Core    | ORM for Identity and Config databases  |
| SQL Server               | Relational database backend            |
| JWT / OIDC               | Secure token-based authentication      |
| Serilog                  | Structured request logging             |
| Angular 19               | SPA client application                 |
| oidc-client-ts           | OIDC Authorization Code + PKCE client  |

---

## 🚀 Getting Started

### 1. Database Configuration

You need two SQL Server databases: one for the API data and one for the Identity Provider (users, configuration, and operational data).

Open `appsettings.json` in the **EswatiniEmployees.IDP** project and configure your connection strings:

```json
{
  "ConnectionStrings": {
    "sqlConnection": "server=.; database=EswatiniEmployee01OAuth; Integrated Security=true; TrustServerCertificate=true",
    "identitySqlConnection": "server=.; database=EswatiniEmployee01OAuthIdentity; Integrated Security=true; TrustServerCertificate=true"
  }
}
```

Do the same for the **EswatiniEmployees** API project:

```json
{
  "ConnectionStrings": {
    "sqlConnection": "server=.; database=EswatiniEmployee01; Integrated Security=true; TrustServerCertificate=true"
  }
}
```

### 2. Configure Email Credentials (IDP)

Update the SMTP settings in the IDP's `appsettings.json` for email verification to work:

```json
"EmailConfiguration": {
  "From": "support.rfk@gmail.com",
  "SmtpServer": "smtp.gmail.com",
  "Port": 465,
  "Username": "support.rfk@gmail.com",
  "Password": "your-app-password-here"
}
```

### 3. Apply Entity Framework Migrations

Open the Package Manager Console (PMC) in Visual Studio, set **EswatiniEmployees.IDP** as the default project, and run the following commands to generate and apply the databases:

```powershell
# Create Operational Store Migration
Add-Migration InitialPersistedGrantMigration -c PersistedGrantDbContext -o Migrations/IdentityServer/PersistedGrantDb

# Create Configuration Store Migration
Add-Migration InitialConfigurationMigration -c ConfigurationDbContext -o Migrations/IdentityServer/ConfigurationDb

# Create ASP.NET Core Identity Migration
Add-Migration CreateIdentityTables -Context UserContext

# Apply to database
Update-Database -Context UserContext
```

> **Note:** Make sure you seed the Configuration Store (Clients, Resources, ApiScopes) from `Config.cs` during your initial application startup.

### 4. Angular Client Setup

The Angular client application is located in `eswatini-employees-client`. It uses Angular 19 and `oidc-client-ts` with the Authorization Code flow and PKCE.

Prerequisites:

* Node.js 18.19 or newer
* npm 10 or newer

Install the dependencies and start the development server:

```powershell
cd eswatini-employees-client
npm ci
npm start
```

Open `http://localhost:4200` after the server starts. The client is registered in IdentityServer as `eswatiniemployeeangularclient` and uses these local endpoints:

* IdentityServer: `https://localhost:5005`
* API: `https://localhost:5001/api`
* OAuth callback: `http://localhost:4200/auth/callback`

Useful Angular commands:

```powershell
npm run build
npm test
```

The API and IdentityServer must be running before signing in through the Angular client.

### 5. Running the ASP.NET Solution

The solution relies on specific ports for the OAuth trust checks to pass. Ensure the launch profiles map to the following:

* **IDP (Identity Provider):** `https://localhost:5005`
* **API (Resource Server):** `https://localhost:5001`
* **ASP.NET Client (Web App):** `https://localhost:5010`

Run the IDP and API together with either the ASP.NET client or the Angular client.

### Angular Client Runtime

The Angular client calls the protected companies endpoint with the access token. Its runtime configuration is in `eswatini-employees-client/src/environments/environment.ts` and `environment.development.ts`.

Start it with:

```powershell
cd eswatini-employees-client
npm ci
npm start
```

Then open `http://localhost:4200`. The Angular client also supports the HTTPS callback URL configured in IdentityServer.

---

## 🏗️ Project Architecture

The solution is divided into domain-specific boundaries:

* **`EswatiniEmployees.IDP`**: The Duende IdentityServer host. Manages users, issues tokens, provides login/consent pages, and handles Google external logins.
* **`EswatiniEmployees.Client`**: The optional front-end ASP.NET Core web application. Uses OpenID Connect to authenticate users via the IDP and calls the API using a captured access token.
* **`eswatini-employees-client`**: The Angular 19 single-page client. Uses `oidc-client-ts` and PKCE to authenticate through the IDP and call the protected API.
* **`EswatiniEmployees`**: The secure Resource API. Validates incoming JWT Bearer tokens and requires specific policies (e.g., `RequireClaim("country", "Eswatini")`).
* **`EmailService`**: A reusable class library containing the `IEmailSender` implementation for routing validation emails.

---

## 🔐 Authorization Flow

The application implements the **Authorization Code Flow with PKCE** for secure, interactive client authentication. 

**Process Overview:**
1. Unauthenticated users attempting to access protected Client pages are redirected to the IDP `authorize` endpoint with a `code_challenge`.
2. The user authenticates at the IDP (via local login or Google) and consents to the requested scopes (`eswatiniemployeeapi.scope`, `roles`, `country`).
3. The IDP returns an authorization code to the Client.
4. The Client silently calls the IDP `token` endpoint, passing the authorization code and the `code_verifier`.
5. The IDP validates the code and verifier, returning an `id_token` and an `access_token`.
6. The Client uses the `access_token` to make secure requests to the Web API.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
