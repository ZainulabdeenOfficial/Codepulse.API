using Codepulse.API.Data;
using Codepulse.API.Models.Domain;
using Codepulse.API.Repositories.Interface;

namespace Codepulse.API.Repositories.Implementation
{
    public class BlogPostRepository : IBlogPostRepository
    {
        private readonly ApplicationDbContext dbContext;

        public BlogPostRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }



        public async Task<BlogPost> createaysn(BlogPost blogPost)
        {
            await dbContext.BlogPosts.AddAsync(blogPost);

            await dbContext.SaveChangesAsync();

            return blogPost;
        }
    }


}
