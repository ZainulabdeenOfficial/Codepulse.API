using Microsoft.AspNetCore.Identity;

namespace Codepulse.API.Repositories.Interface
{
    public interface ITokenReposistory
    {
        string CreateJWTTokken(IdentityUser user,List<string> Roules);
    }
}
