using Codepulse.API.Repositories.Interface;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Codepulse.API.Repositories.Implementation
{
    public class TokenReposistory : ITokenReposistory
    {
        private readonly IConfiguration configuration;

        public TokenReposistory(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        public string CreateJWTTokken(IdentityUser user, List<string> Roules)
        {

            // Create claims from Rules

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email),
            };

            claims.AddRange(Roules.Select(role=> new Claim(ClaimTypes.Role, role)));




            // JWT Seacurty Token Parameters

            var Key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));

            var Credential = new SigningCredentials(Key,SecurityAlgorithms.HmacSha256);

            var Token = new JwtSecurityToken(
                issuer: configuration["Jwt:Issuer"],
                audience: configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: Credential

                );
            // Generate Token

            return new JwtSecurityTokenHandler().WriteToken(Token);


        }


    }
}
