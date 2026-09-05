using Duende.IdentityServer;
using Duende.IdentityServer.Models;

namespace EswatiniEmployees.IDP;

public static class Config
{
    public static IEnumerable<IdentityResource> Ids =>
        new IdentityResource[]
        {
            new IdentityResources.OpenId(),
            new IdentityResources.Profile(),
            new IdentityResources.Address(),
            new IdentityResource("roles", "User role(s)", new List<string> { "role" }),
            new IdentityResource("country", "Your country", new List<string> { "country" })
        };

    public static IEnumerable<ApiScope> ApiScopes =>
        new ApiScope[]
        {
            new ApiScope("eswatiniemployeeapi.scope", "EswatiniEmployee API Scope")
        };

    public static IEnumerable<ApiResource> Apis =>
        new ApiResource[]
        {
            new ApiResource("eswatiniemployeeapi", "EswatiniEmployee API")
            {
                    Scopes = { "eswatiniemployeeapi.scope" },
                    UserClaims = new List<string> { "role" }
            }
        };

    public static IEnumerable<Client> Clients =>
        new Client[]
        {
            new Client
            {
                ClientName = "EswatiniEmployeeClient",
                ClientId = "eswatiniemployeeclient",
                AllowedGrantTypes = GrantTypes.Code,
                RedirectUris = new List<string>{ "https://localhost:5010/signin-oidc" },
                AllowedScopes = 
                { 
                    IdentityServerConstants.StandardScopes.OpenId, 
                    IdentityServerConstants.StandardScopes.Profile, 
                    IdentityServerConstants.StandardScopes.Address,
                    "roles",
                    "eswatiniemployeeapi.scope",
                    "country"
                },
                ClientSecrets = { new Secret("EswatiniEmployeeClientSecret".Sha512()) },
                RequirePkce = true,
                RequireConsent = true,
                PostLogoutRedirectUris = new List<string> { "https://localhost:5010/signout-callback-oidc" },
                ClientUri = "https://localhost:5010",
                AccessTokenLifetime = 120,
                AllowOfflineAccess = true,
                UpdateAccessTokenClaimsOnRefresh = true
            },
            new Client
            {
                ClientName = "EswatiniEmployeeAngularClient",
                ClientId = "eswatiniemployeeangularclient",
                AllowedGrantTypes = GrantTypes.Code,
                RedirectUris = new List<string>
                {
                    "http://localhost:4200/auth/callback",
                    "https://localhost:4200/auth/callback"
                },
                AllowedScopes =
                {
                    IdentityServerConstants.StandardScopes.OpenId,
                    IdentityServerConstants.StandardScopes.Profile,
                    IdentityServerConstants.StandardScopes.Address,
                    "roles",
                    "eswatiniemployeeapi.scope",
                    "country"
                },
                RequirePkce = true,
                RequireClientSecret = false,
                RequireConsent = true,
                AllowedCorsOrigins = new List<string>
                {
                    "http://localhost:4200",
                    "https://localhost:4200"
                },
                PostLogoutRedirectUris = new List<string>
                {
                    "http://localhost:4200/",
                    "https://localhost:4200/"
                },
                ClientUri = "https://localhost:4200",
                AccessTokenLifetime = 120,
                AllowOfflineAccess = true,
                UpdateAccessTokenClaimsOnRefresh = true
            }
        };
}