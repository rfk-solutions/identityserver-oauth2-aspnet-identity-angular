using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace EswatiniEmployees.IDP.Pages.Account.Register
{
    [AllowAnonymous]
    public class SuccessRegistrationModel : PageModel
    {
        public string ReturnUrl { get; set; }

        public IActionResult OnGet(string returnUrl)
        {
            ReturnUrl = returnUrl;
            return Page();
        }
    }
}
