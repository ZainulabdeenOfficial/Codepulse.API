
using Codepulse.API.Models.Domain;
using Microsoft.EntityFrameworkCore;


namespace Codepulse.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<BlogPost> BlogPosts { get; set; }

        public DbSet<Catogrey> Categories { get; set; }

        public  DbSet<BlogImage> BlogImages { get; set; }
    }
}
