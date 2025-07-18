using Codepulse.API.Models.Domain;

namespace Codepulse.API.Repositories.Interface
{
    public interface IBlogPostRepository
    {
        Task<BlogPost> createaysn(BlogPost blogPost);
    }
}
