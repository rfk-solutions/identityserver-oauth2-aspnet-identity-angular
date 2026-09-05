using System.ComponentModel.DataAnnotations;

namespace EswatiniEmployees.IDP.Entities.ViewModels;

public class ForgotPasswordModel
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }
}
