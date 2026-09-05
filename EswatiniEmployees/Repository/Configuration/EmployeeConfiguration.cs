using Entities.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Repository.Configuration;

public class EmployeeConfiguration : IEntityTypeConfiguration<Employee>
{
    public void Configure(EntityTypeBuilder<Employee> builder)
    {
        builder.HasData
        (
            // --- Company 1: Eswatini Textile Ltd ---
            new Employee
            {
                Id = new Guid("80abbca8-664d-4b20-b5de-024705497d4a"),
                Name = "Sibusiso Dlamini",
                Age = 28,
                Position = "QA Supervisor",
                CompanyId = new Guid("c9d4c053-49b6-410c-bc78-2d54a9991870")
            },
            new Employee
            {
                Id = new Guid("86dba8c0-d178-41e7-938c-ed49778fb52a"),
                Name = "Nokuthula Zwane",
                Age = 32,
                Position = "Pattern Maker",
                CompanyId = new Guid("c9d4c053-49b6-410c-bc78-2d54a9991870")
            },
            new Employee
            {
                Id = new Guid("a0e1c2b3-0001-4a11-b001-000000000001"),
                Name = "Bheki Nkambule",
                Age = 41,
                Position = "Plant Manager",
                CompanyId = new Guid("c9d4c053-49b6-410c-bc78-2d54a9991870")
            },
            new Employee
            {
                Id = new Guid("a0e1c2b3-0001-4a11-b001-000000000002"),
                Name = "Siphesihle Khumalo",
                Age = 26,
                Position = "Cutting Machine Operator",
                CompanyId = new Guid("c9d4c053-49b6-410c-bc78-2d54a9991870")
            },
            new Employee
            {
                Id = new Guid("a0e1c2b3-0001-4a11-b001-000000000003"),
                Name = "Lungelo Gamedze",
                Age = 35,
                Position = "Maintenance Specialist",
                CompanyId = new Guid("c9d4c053-49b6-410c-bc78-2d54a9991870")
            },
            new Employee
            {
                Id = new Guid("a0e1c2b3-0001-4a11-b001-000000000004"),
                Name = "Nomcebo Mamba",
                Age = 29,
                Position = "Inventory Controller",
                CompanyId = new Guid("c9d4c053-49b6-410c-bc78-2d54a9991870")
            },
            new Employee
            {
                Id = new Guid("a0e1c2b3-0001-4a11-b001-000000000005"),
                Name = "Mthobisi Vilakati",
                Age = 30,
                Position = "Fabric Inspector",
                CompanyId = new Guid("c9d4c053-49b6-410c-bc78-2d54a9991870")
            },
            new Employee
            {
                Id = new Guid("a0e1c2b3-0001-4a11-b001-000000000006"),
                Name = "Tengetile Shongwe",
                Age = 24,
                Position = "Junior Designer",
                CompanyId = new Guid("c9d4c053-49b6-410c-bc78-2d54a9991870")
            },
            new Employee
            {
                Id = new Guid("a0e1c2b3-0001-4a11-b001-000000000007"),
                Name = "Bandile Fakudze",
                Age = 38,
                Position = "Logistics Coordinator",
                CompanyId = new Guid("c9d4c053-49b6-410c-bc78-2d54a9991870")
            },
            new Employee
            {
                Id = new Guid("a0e1c2b3-0001-4a11-b001-000000000008"),
                Name = "Phiwayinkosi Ginindza",
                Age = 45,
                Position = "Health & Safety Officer",
                CompanyId = new Guid("c9d4c053-49b6-410c-bc78-2d54a9991870")
            },

            // --- Company 2: Royal Garments Eswatini ---
            new Employee
            {
                Id = new Guid("021ca3c1-0deb-4afd-ae94-2159a8479811"),
                Name = "Thabo Maseko",
                Age = 39,
                Position = "Production Manager",
                CompanyId = new Guid("3d490a70-94ce-4d15-9494-5248280c2ce3")
            },
            new Employee
            {
                Id = new Guid("a0e1c2b3-0002-4a11-b002-000000000001"),
                Name = "Sikhumbuzo Nxumalo",
                Age = 34,
                Position = "Senior Tailor",
                CompanyId = new Guid("3d490a70-94ce-4d15-9494-5248280c2ce3")
            },
            new Employee
            {
                Id = new Guid("a0e1c2b3-0002-4a11-b002-000000000002"),
                Name = "Zodwa Magagula",
                Age = 27,
                Position = "Seamstress Supervisor",
                CompanyId = new Guid("3d490a70-94ce-4d15-9494-5248280c2ce3")
            },
            new Employee
            {
                Id = new Guid("a0e1c2b3-0002-4a11-b002-000000000003"),
                Name = "Mandla Tsabedze",
                Age = 44,
                Position = "Warehouse Supervisor",
                CompanyId = new Guid("3d490a70-94ce-4d15-9494-5248280c2ce3")
            },
            new Employee
            {
                Id = new Guid("a0e1c2b3-0002-4a11-b002-000000000004"),
                Name = "Nomathemba Nsibande",
                Age = 31,
                Position = "Quality Inspector",
                CompanyId = new Guid("3d490a70-94ce-4d15-9494-5248280c2ce3")
            },
            new Employee
            {
                Id = new Guid("a0e1c2b3-0002-4a11-b002-000000000005"),
                Name = "Musa Hlophe",
                Age = 25,
                Position = "Packing Technician",
                CompanyId = new Guid("3d490a70-94ce-4d15-9494-5248280c2ce3")
            },
            new Employee
            {
                Id = new Guid("a0e1c2b3-0002-4a11-b002-000000000006"),
                Name = "Simangele Kunene",
                Age = 36,
                Position = "HR Officer",
                CompanyId = new Guid("3d490a70-94ce-4d15-9494-5248280c2ce3")
            },
            new Employee
            {
                Id = new Guid("a0e1c2b3-0002-4a11-b002-000000000007"),
                Name = "Vusi Matsebula",
                Age = 48,
                Position = "Chief Mechanic",
                CompanyId = new Guid("3d490a70-94ce-4d15-9494-5248280c2ce3")
            },
            new Employee
            {
                Id = new Guid("a0e1c2b3-0002-4a11-b002-000000000008"),
                Name = "Nonhlanhla Mavuso",
                Age = 29,
                Position = "Accounts Clerk",
                CompanyId = new Guid("3d490a70-94ce-4d15-9494-5248280c2ce3")
            },
            new Employee
            {
                Id = new Guid("a0e1c2b3-0002-4a11-b002-000000000009"),
                Name = "Lindiwe Bhembe",
                Age = 40,
                Position = "Sourcing Specialist",
                CompanyId = new Guid("3d490a70-94ce-4d15-9494-5248280c2ce3")
            },

            // --- Company 3: Mbabane Tech Solutions ---
            new Employee
            {
                Id = new Guid("a0e1c2b3-0003-4a11-b003-000000000001"),
                Name = "Melusi Simelane",
                Age = 33,
                Position = "Lead Software Engineer",
                CompanyId = new Guid("a1f8b212-654a-4d92-9e81-34a6e87f1082")
            },
            new Employee
            {
                Id = new Guid("a0e1c2b3-0003-4a11-b003-000000000002"),
                Name = "Njabulo Myeni",
                Age = 29,
                Position = "Backend Developer",
                CompanyId = new Guid("a1f8b212-654a-4d92-9e81-34a6e87f1082")
            },
            new Employee
            {
                Id = new Guid("a0e1c2b3-0003-4a11-b003-000000000003"),
                Name = "Temaswati Lukhele",
                Age = 26,
                Position = "Frontend Developer",
                CompanyId = new Guid("a1f8b212-654a-4d92-9e81-34a6e87f1082")
            },
            new Employee
            {
                Id = new Guid("a0e1c2b3-0003-4a11-b003-000000000004"),
                Name = "Sandile Dube",
                Age = 37,
                Position = "DevOps Engineer",
                CompanyId = new Guid("a1f8b212-654a-4d92-9e81-34a6e87f1082")
            },
            new Employee
            {
                Id = new Guid("a0e1c2b3-0003-4a11-b003-000000000005"),
                Name = "Khanyisile Ndzinisa",
                Age = 31,
                Position = "UI/UX Designer",
                CompanyId = new Guid("a1f8b212-654a-4d92-9e81-34a6e87f1082")
            },
            new Employee
            {
                Id = new Guid("a0e1c2b3-0003-4a11-b003-000000000006"),
                Name = "Mcebo Mamba",
                Age = 27,
                Position = "QA Analyst",
                CompanyId = new Guid("a1f8b212-654a-4d92-9e81-34a6e87f1082")
            },
            new Employee
            {
                Id = new Guid("a0e1c2b3-0003-4a11-b003-000000000007"),
                Name = "Tfobile Dlamini",
                Age = 42,
                Position = "Project Manager",
                CompanyId = new Guid("a1f8b212-654a-4d92-9e81-34a6e87f1082")
            },
            new Employee
            {
                Id = new Guid("a0e1c2b3-0003-4a11-b003-000000000008"),
                Name = "Nkosinathi Shabangu",
                Age = 35,
                Position = "Database Administrator",
                CompanyId = new Guid("a1f8b212-654a-4d92-9e81-34a6e87f1082")
            },
            new Employee
            {
                Id = new Guid("a0e1c2b3-0003-4a11-b003-000000000009"),
                Name = "Sabelo Adams",
                Age = 24,
                Position = "IT Support Specialist",
                CompanyId = new Guid("a1f8b212-654a-4d92-9e81-34a6e87f1082")
            },
            new Employee
            {
                Id = new Guid("a0e1c2b3-0003-4a11-b003-000000000010"),
                Name = "Gcinile Mkhatshwa",
                Age = 38,
                Position = "Scrum Master",
                CompanyId = new Guid("a1f8b212-654a-4d92-9e81-34a6e87f1082")
            },

            // --- Company 4: Swazi Sugar Processors ---
            new Employee
            {
                Id = new Guid("a0e1c2b3-0004-4a11-b004-000000000001"),
                Name = "Thulani Masuku",
                Age = 46,
                Position = "Operations Director",
                CompanyId = new Guid("f2c90e44-8832-4e2b-b98a-7d1a23e59041")
            },
            new Employee
            {
                Id = new Guid("a0e1c2b3-0004-4a11-b004-000000000002"),
                Name = "Zanele Nlangamandla",
                Age = 34,
                Position = "Chemical Engineer",
                CompanyId = new Guid("f2c90e44-8832-4e2b-b98a-7d1a23e59041")
            },
            new Employee
            {
                Id = new Guid("a0e1c2b3-0004-4a11-b004-000000000003"),
                Name = "Nathi Ziyane",
                Age = 39,
                Position = "Refinery Engineer",
                CompanyId = new Guid("f2c90e44-8832-4e2b-b98a-7d1a23e59041")
            },
            new Employee
            {
                Id = new Guid("a0e1c2b3-0004-4a11-b004-000000000004"),
                Name = "Siphokazi Sithole",
                Age = 28,
                Position = "Lab Analyst",
                CompanyId = new Guid("f2c90e44-8832-4e2b-b98a-7d1a23e59041")
            },
            new Employee
            {
                Id = new Guid("a0e1c2b3-0004-4a11-b004-000000000005"),
                Name = "Bongani Cele",
                Age = 51,
                Position = "Safety Inspector",
                CompanyId = new Guid("f2c90e44-8832-4e2b-b98a-7d1a23e59041")
            },
            new Employee
            {
                Id = new Guid("a0e1c2b3-0004-4a11-b004-000000000006"),
                Name = "Phetsile Thwala",
                Age = 30,
                Position = "Supply Chain Planner",
                CompanyId = new Guid("f2c90e44-8832-4e2b-b98a-7d1a23e59041")
            },
            new Employee
            {
                Id = new Guid("a0e1c2b3-0004-4a11-b004-000000000007"),
                Name = "Mzwandile Ndlangamandla",
                Age = 43,
                Position = "Electrical Specialist",
                CompanyId = new Guid("f2c90e44-8832-4e2b-b98a-7d1a23e59041")
            },
            new Employee
            {
                Id = new Guid("a0e1c2b3-0004-4a11-b004-000000000008"),
                Name = "Ndumiso Nxumalo",
                Age = 27,
                Position = "Boiler Operator",
                CompanyId = new Guid("f2c90e44-8832-4e2b-b98a-7d1a23e59041")
            },
            new Employee
            {
                Id = new Guid("a0e1c2b3-0004-4a11-b004-000000000009"),
                Name = "Sebenele Dlamini",
                Age = 32,
                Position = "Procurement Officer",
                CompanyId = new Guid("f2c90e44-8832-4e2b-b98a-7d1a23e59041")
            },
            new Employee
            {
                Id = new Guid("a0e1c2b3-0004-4a11-b004-000000000010"),
                Name = "Ncamsile Dladla",
                Age = 36,
                Position = "Environmental Officer",
                CompanyId = new Guid("f2c90e44-8832-4e2b-b98a-7d1a23e59041")
            },

            // --- Company 5: Peak Timber Products ---
            new Employee
            {
                Id = new Guid("a0e1c2b3-0005-4a11-b005-000000000001"),
                Name = "Kenneth Mkhonta",
                Age = 50,
                Position = "General Manager",
                CompanyId = new Guid("5b7e9231-11d4-42bc-a2d9-e932b1029c73")
            },
            new Employee
            {
                Id = new Guid("a0e1c2b3-0005-4a11-b005-000000000002"),
                Name = "Mbongeni Vilane",
                Age = 37,
                Position = "Forestry Supervisor",
                CompanyId = new Guid("5b7e9231-11d4-42bc-a2d9-e932b1029c73")
            },
            new Employee
            {
                Id = new Guid("a0e1c2b3-0005-4a11-b005-000000000003"),
                Name = "Thandeka Mkhwanazi",
                Age = 29,
                Position = "Mill Supervisor",
                CompanyId = new Guid("5b7e9231-11d4-42bc-a2d9-e932b1029c73")
            },
            new Employee
            {
                Id = new Guid("a0e1c2b3-0005-4a11-b005-000000000004"),
                Name = "Siyabonga Ndlovu",
                Age = 41,
                Position = "Logistics Manager",
                CompanyId = new Guid("5b7e9231-11d4-42bc-a2d9-e932b1029c73")
            },
            new Employee
            {
                Id = new Guid("a0e1c2b3-0005-4a11-b005-000000000005"),
                Name = "Anotida Maphosa",
                Age = 33,
                Position = "Timber Grader",
                CompanyId = new Guid("5b7e9231-11d4-42bc-a2d9-e932b1029c73")
            },
            new Employee
            {
                Id = new Guid("a0e1c2b3-0005-4a11-b005-000000000006"),
                Name = "Lindokuhle Zwane",
                Age = 26,
                Position = "Kiln Operator",
                CompanyId = new Guid("5b7e9231-11d4-42bc-a2d9-e932b1029c73")
            },
            new Employee
            {
                Id = new Guid("a0e1c2b3-0005-4a11-b005-000000000007"),
                Name = "Bonginkosi Mthembu",
                Age = 44,
                Position = "Heavy Equipment Mechanic",
                CompanyId = new Guid("5b7e9231-11d4-42bc-a2d9-e932b1029c73")
            },
            new Employee
            {
                Id = new Guid("a0e1c2b3-0005-4a11-b005-000000000008"),
                Name = "Nosipho Shabalala",
                Age = 31,
                Position = "Sales Representative",
                CompanyId = new Guid("5b7e9231-11d4-42bc-a2d9-e932b1029c73")
            },
            new Employee
            {
                Id = new Guid("a0e1c2b3-0005-4a11-b005-000000000009"),
                Name = "Sifiso Mdluli",
                Age = 38,
                Position = "Safety Coordinator",
                CompanyId = new Guid("5b7e9231-11d4-42bc-a2d9-e932b1029c73")
            },
            new Employee
            {
                Id = new Guid("a0e1c2b3-0005-4a11-b005-000000000010"),
                Name = "Lwazi Khumalo",
                Age = 23,
                Position = "Junior Accountant",
                CompanyId = new Guid("5b7e9231-11d4-42bc-a2d9-e932b1029c73")
            }
        );
    }
}