using Codepulse.API.Data;
using Codepulse.API.Models.Domain;
using Codepulse.API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

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

        public async Task<IEnumerable<BlogPost>> GetAllAsync()
        {
           return  await dbContext.BlogPosts.Include(x=>x.Cetagories).ToListAsync();
        }

        public async Task<BlogPost?> GetByIDAsync(Guid id)
        {
            return await dbContext.BlogPosts.Include(x => x.Cetagories).FirstOrDefaultAsync(x => x.ID == id);
        }
    }


}
