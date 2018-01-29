using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using System.Security;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Net;

namespace OAuthMVC.Controllers
{
    [Route("api/[controller]")]
    public class LoginController: Controller
    {

        [HttpGet("OAuthLogin")]
        public IActionResult OAuthLogin()
        {
            string providerName = HttpContext.Request.Query["providerName"];
            return Challenge(new AuthenticationProperties { RedirectUri = "/api/Login/StartSession" }, providerName);
        }

        [HttpGet("Logout")]
        [HttpPost("Logout")]
        public IActionResult Logout()
        {
            return SignOut(new AuthenticationProperties { RedirectUri = "/"  },  CookieAuthenticationDefaults.AuthenticationScheme);
        }


        [HttpGet("StartSession")]
        public IActionResult StartSession()
        {
            if(IsUserAuthenticated())
                return Redirect("/securecontent");

            return Redirect("/home");
        }

        [HttpGet("IsAuthenticated")]
        public JsonResult IsAuthenticated()
        {
            return Json(IsUserAuthenticated());
        }

        private bool IsUserAuthenticated()
        {
            return User?.Identity?.IsAuthenticated ?? false;
        }

        [HttpGet("GetUserClaims")]
        public JsonResult GetUserClaims()
        {
            List<UserClaim> claims = new List<UserClaim>();

            if (IsUserAuthenticated() && (HttpContext.User?.Claims?.Any() ?? false))
                claims = HttpContext.User.Claims.Select(x => new UserClaim { ClaimType = x.Type, ClaimValue = x.Value }).ToList();

            return Json(claims);
        }
    }

    public class UserClaim
    {
        public string ClaimType { get; set; }
        public string ClaimValue { get; set; }
    }
}
