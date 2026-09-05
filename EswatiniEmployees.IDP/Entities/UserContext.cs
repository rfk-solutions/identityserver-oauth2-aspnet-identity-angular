using EswatiniEmployees.IDP.Entities.Configuration;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace EswatiniEmployees.IDP.Entities;

public class UserContext : IdentityDbContext<User>
{
    public UserContext(DbContextOptions<UserContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.ApplyConfiguration(new RoleConfiguration());
    }
}
