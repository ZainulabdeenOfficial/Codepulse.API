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

        public async Task<BlogPost?> UpdateAysnc(BlogPost blogPost)
        {
         var ExisitingBlogpost =  await dbContext.BlogPosts.Include(x=>x.Cetagories).
                FirstOrDefaultAsync(x=>x.ID == blogPost.ID);
            if (ExisitingBlogpost == null)
            {
                return null;
            }
            // Update Blgpost
            dbContext.Entry(ExisitingBlogpost).CurrentValues.SetValues(blogPost);
            // Update Cetogries
            ExisitingBlogpost.Cetagories = blogPost.Cetagories;

            await dbContext.SaveChangesAsync();

            return blogPost;

        }
        public async Task<BlogPost?> DeleteAysnc(Guid id)
        {
         var ExistingVariable =   await dbContext.BlogPosts.FirstOrDefaultAsync(x=>x.ID==id);
            if (ExistingVariable == null)
            {
                return null;
            }
            dbContext.BlogPosts.Remove(ExistingVariable);
            await dbContext.SaveChangesAsync();
            return ExistingVariable;
        }

    }


}
