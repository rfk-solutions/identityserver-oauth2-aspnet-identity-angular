using System.ComponentModel.DataAnnotations;

namespace EswatiniEmployees.IDP.Entities.ViewModels;

public class TwoStepModel
{
    [Required]
    [DataType(DataType.Text)]
    public string TwoFactorCode { get; set; }
    public bool RememberLogin { get; set; }
}
