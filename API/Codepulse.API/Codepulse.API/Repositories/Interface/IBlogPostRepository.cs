using Codepulse.API.Models.Domain;

namespace Codepulse.API.Repositories.Interface
{
    public interface IBlogPostRepository
    {
        Task<BlogPost> createaysn(BlogPost blogPost);

        Task<IEnumerable<BlogPost>> GetAllAsync();

      Task<BlogPost ?> GetByIDAsync(Guid id);

    Task <BlogPost ?> UpdateAysnc(BlogPost blogPost);
     

     
    }
}
