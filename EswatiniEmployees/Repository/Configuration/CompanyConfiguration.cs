using Entities.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Repository.Configuration;

public class CompanyConfiguration : IEntityTypeConfiguration<Company>
{
    public void Configure(EntityTypeBuilder<Company> builder)
    {
        builder.HasData
        (
            new Company
            {
                Id = new Guid("c9d4c053-49b6-410c-bc78-2d54a9991870"),
                Name = "Eswatini Textile Ltd",
                Address = "Plot 45, Matsapha Industrial Estate",
                Country = "Eswatini"
            },
            new Company
            {
                Id = new Guid("3d490a70-94ce-4d15-9494-5248280c2ce3"),
                Name = "Royal Garments Eswatini",
                Address = "102 King Mswati III Ave, Nhlangano",
                Country = "Eswatini"
            },
            new Company
            {
                Id = new Guid("a1f8b212-654a-4d92-9e81-34a6e87f1082"),
                Name = "Mbabane Tech Solutions",
                Address = "Suite 201, Corporate Place, Mbabane",
                Country = "Eswatini"
            },
            new Company
            {
                Id = new Guid("f2c90e44-8832-4e2b-b98a-7d1a23e59041"),
                Name = "Swazi Sugar Processors",
                Address = "Mill Road, Simunye",
                Country = "Eswatini"
            },
            new Company
            {
                Id = new Guid("5b7e9231-11d4-42bc-a2d9-e932b1029c73"),
                Name = "Peak Timber Products",
                Address = "Main Road, Pigg's Peak",
                Country = "Eswatini"
            }
        );
    }
}