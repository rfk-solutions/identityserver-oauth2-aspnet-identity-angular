using EswatiniEmployees.IDP.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace EswatiniEmployees.IDP.Pages.Account.Register
{
    [AllowAnonymous]
    public class ConfirmEmailModel : PageModel
    {
        private readonly UserManager<User> _userManager;

        public string ReturnUrl { get; set; }

        public ConfirmEmailModel(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        public async Task<IActionResult> OnGet(string token, string email, string returnUrl)
        {
            ReturnUrl = returnUrl;

            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
                return RedirectToPage("/Account/Error", new { returnUrl });

            var result = await _userManager.ConfirmEmailAsync(user, token);
            if (result.Succeeded)
                return Redirect(SafeReturnUrl(returnUrl));
            else
                return RedirectToPage("/Account/Error", new { returnUrl });
        }

        private string SafeReturnUrl(string returnUrl)
        {
            if (!Uri.TryCreate(returnUrl, UriKind.Absolute, out var uri))
                return "/Account/Login/Index";

            var configuredOrigin = HttpContext.RequestServices
                .GetRequiredService<IConfiguration>()
                ["Authentication:Angular:ClientOrigin"];
            var defaultOrigins = new[] { "http://localhost:4200", "https://localhost:4200" };
            var origin = uri.GetLeftPart(UriPartial.Authority).TrimEnd('/');
            var isAllowed = (configuredOrigin is not null && origin.Equals(configuredOrigin.TrimEnd('/'), StringComparison.OrdinalIgnoreCase))
                || defaultOrigins.Contains(origin, StringComparer.OrdinalIgnoreCase);

            return isAllowed && (uri.Scheme == Uri.UriSchemeHttp || uri.Scheme == Uri.UriSchemeHttps)
                ? uri.ToString()
                : "/Account/Login/Index";
        }
    }
}
