using Codepulse.API.Data;
using Codepulse.API.Models.Domain;
using Codepulse.API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace Codepulse.API.Repositories.Implementation
{
    public class CetagoryRespostiries : ICategoeryRepository
    {
        private readonly ApplicationDbContext dbContext;

        public CetagoryRespostiries(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public  async Task<Catogrey> CreateAysnc(Catogrey catogrey)
        {
            // Add to database

            await dbContext.Categories.AddAsync(catogrey);

            await dbContext.SaveChangesAsync();

            return catogrey;
        }
    }
}
