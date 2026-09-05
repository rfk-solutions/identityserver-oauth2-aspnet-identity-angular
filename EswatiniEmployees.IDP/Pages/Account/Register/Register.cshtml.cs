using AutoMapper;
using EswatiniEmployees.IDP.Entities;
using EswatiniEmployees.IDP.Entities.ViewModels;
using EmailService;
using IdentityModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Runtime.CompilerServices;
using System.Security.Claims;

namespace EswatiniEmployees.IDP.Pages.Account.Register
{
    [AllowAnonymous]
    public class RegisterModel : PageModel
    {
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        private readonly IEmailSender _emailSender;

        [BindProperty]
        public UserRegistrationModel Input { get; set; }
        [BindProperty]
        public string ReturnUrl { get; set; }

        public RegisterModel(UserManager<User> userManager, IMapper mapper, IEmailSender emailSender)
        {
            _userManager = userManager;
            _mapper = mapper;
            _emailSender = emailSender; 
        }

        public IActionResult OnGet(string returnUrl)
        {
            ReturnUrl = returnUrl;

            return Page();
        }

        public async Task<IActionResult> OnPost()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            var user = _mapper.Map<User>(Input);

            var result = await _userManager.CreateAsync(user, Input.Password);
            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.TryAddModelError(error.Code, error.Description);
                }

                return Page();
            }

            await _userManager.AddToRoleAsync(user, "Visitor");

            await _userManager.AddClaimsAsync(user, new List<Claim>
            {
                new Claim(JwtClaimTypes.GivenName, user.FirstName),
                new Claim(JwtClaimTypes.FamilyName, user.LastName),
                new Claim(JwtClaimTypes.Role, "Visitor"),
                new Claim(JwtClaimTypes.Address, user.Address),
                new Claim("country", user.Country)
                });

            await SendEmailConfirmationLink(user);

            return RedirectToPage("/Account/Register/SuccessRegistration", new { returnUrl = SafeReturnUrl(ReturnUrl) });
        }

        private async Task SendEmailConfirmationLink(User user)
        {
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var safeReturnUrl = SafeReturnUrl(ReturnUrl);
            var confirmationLink = Url.Page("/Account/Register/ConfirmEmail", null,
                new { token, email = user.Email, returnUrl = safeReturnUrl }, Request.Scheme);

            var message = new Message(new string[] { user.Email },
                "Confirmation email link", confirmationLink, null);

            await _emailSender.SendEmailAsync(message);
        }

        private string SafeReturnUrl(string returnUrl)
        {
            if (!Uri.TryCreate(returnUrl, UriKind.Absolute, out var uri))
                return "/";

            var configuredOrigin = HttpContext.RequestServices
                .GetRequiredService<IConfiguration>()
                ["Authentication:Angular:ClientOrigin"];

            var defaultOrigins = new[] { "http://localhost:4200", "https://localhost:4200" };
            var isAllowed = (configuredOrigin is not null && uri.GetLeftPart(UriPartial.Authority).TrimEnd('/') == configuredOrigin.TrimEnd('/'))
                || defaultOrigins.Contains(uri.GetLeftPart(UriPartial.Authority).TrimEnd('/'), StringComparer.OrdinalIgnoreCase);

            return isAllowed && (uri.Scheme == Uri.UriSchemeHttp || uri.Scheme == Uri.UriSchemeHttps)
                ? uri.ToString()
                : "/";
        }

    }
}
