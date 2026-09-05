using AutoMapper;
using EswatiniEmployees.IDP.Entities;
using EswatiniEmployees.IDP.Entities.ViewModels;

namespace EswatiniEmployees.IDP;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<UserRegistrationModel, User>()
            .ForMember(u => u.UserName, opt => opt.MapFrom(x => x.Email));
    }
}
