using Duende.IdentityServer.EntityFramework.DbContexts;
using Duende.IdentityServer.EntityFramework.Mappers;
using Microsoft.EntityFrameworkCore;

namespace EswatiniEmployees.IDP.InitialSeed;

public static class MigrationManager
{
	public static WebApplication MigrateDatabase(this WebApplication app)
	{
		using (var scope = app.Services.CreateScope())
		{
			scope.ServiceProvider
				.GetRequiredService<PersistedGrantDbContext>()
				.Database
				.Migrate();

			using (var context = scope.ServiceProvider
				.GetRequiredService<ConfigurationDbContext>())
			{
				try
				{
					context.Database.Migrate();

					foreach (var client in Config.Clients)
					{
						var existingClient = context.Clients
							.Include(item => item.AllowedCorsOrigins)
							.Include(item => item.RedirectUris)
							.Include(item => item.PostLogoutRedirectUris)
							.SingleOrDefault(item => item.ClientId == client.ClientId);

						if (existingClient is null)
						{
							context.Clients.Add(client.ToEntity());
						}
						else
						{
							existingClient.RedirectUris.Clear();
							foreach (var redirectUri in client.RedirectUris)
							{
								existingClient.RedirectUris.Add(new Duende.IdentityServer.EntityFramework.Entities.ClientRedirectUri
								{
									RedirectUri = redirectUri
								});
							}

							existingClient.PostLogoutRedirectUris.Clear();
							foreach (var redirectUri in client.PostLogoutRedirectUris)
							{
								existingClient.PostLogoutRedirectUris.Add(new Duende.IdentityServer.EntityFramework.Entities.ClientPostLogoutRedirectUri
								{
									PostLogoutRedirectUri = redirectUri
								});
							}

							existingClient.AllowedCorsOrigins.Clear();
							foreach (var origin in client.AllowedCorsOrigins)
							{
								existingClient.AllowedCorsOrigins.Add(new Duende.IdentityServer.EntityFramework.Entities.ClientCorsOrigin
								{
									Origin = origin
								});
							}
						}

						context.SaveChanges();
					}

					if (!context.IdentityResources.Any())
					{
						foreach (var resource in Config.Ids)
						{
							context.IdentityResources.Add(resource.ToEntity());
						}
						context.SaveChanges();
					}

					if (!context.ApiScopes.Any())
					{
						foreach (var apiScope in Config.ApiScopes)
						{
							context.ApiScopes.Add(apiScope.ToEntity());
						}
						context.SaveChanges();
					}

					if (!context.ApiResources.Any())
					{
						foreach (var resource in Config.Apis)
						{
							context.ApiResources.Add(resource.ToEntity());
						}
						context.SaveChanges();
					}
				}
				catch (Exception)
				{
					//Log errors or do anything you think it's needed
					throw;
				}
			}
		}

		return app;
	}
}
