using Codepulse.API.Models.DTO;
using Codepulse.API.Repositories.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;

namespace Codepulse.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly ITokenReposistory tokenReposistory;

        public AuthController(UserManager<IdentityUser> userManager,ITokenReposistory tokenReposistory)
        {
            this.userManager = userManager;
            this.tokenReposistory = tokenReposistory;
        }


        [HttpPost]
        //Post ://ApiBaseUrl/api/auth/Login
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto request)
        {
        
         var Identityuser =   await userManager.FindByEmailAsync(request.Email);

            if (Identityuser is not null)
            {
                // Check password

               var CheckPssword =  await userManager.CheckPasswordAsync(Identityuser, request.Password);

                if (CheckPssword)


                {
                    var Roles = await userManager.GetRolesAsync(Identityuser);
                    // Create tokken and repsone 
                  var JwtToken =    tokenReposistory.CreateJWTTokken(Identityuser, Roles.ToList());

                    var response = new LoginResponseDto()
                    {
                        Email = request.Email,
                        Roles = Roles.ToList(),
                        Token = "Token",



                    };

                    return Ok(response);

                }
            }
            ModelState.AddModelError("","Email or password incorrect");

            return ValidationProblem(ModelState);
        
        }



        //Post ://ApiBaseUrl/api/auth/register
        [HttpPost]
        [Route("register")]

        public async Task<IActionResult> Resgister([FromBody] RegisterRequestDtoClass request)
        {

            // Create Identiy Object 

            var user = new IdentityUser
            {
                UserName = request.Email?.Trim(),
                Email = request.Email?.Trim()

            };


            var IdentityResult = await userManager.CreateAsync(user, request.Password);

            if (IdentityResult.Succeeded)
            {
                //AddRole  to User reader
                IdentityResult = await userManager.AddToRoleAsync(user, "Reader");

                if (IdentityResult.Succeeded)
                {
                    return Ok();
                }
                else
                {
                    if (IdentityResult.Errors.Any())
                    {
                        foreach (var error in IdentityResult.Errors)
                        {
                            ModelState.AddModelError("", error.Description);
                        }
                    }

                }
            }
            else
            {
                if (IdentityResult.Errors.Any())
                {
                    foreach (var error in IdentityResult.Errors)
                    {
                        ModelState.AddModelError("", error.Description);
                    }
                }

            }


            return ValidationProblem(ModelState);


        }
       
    }
}
