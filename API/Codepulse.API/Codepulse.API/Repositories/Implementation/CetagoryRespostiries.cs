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

       

        public async Task<IEnumerable<Catogrey>> GetAllAsync()
        {
            return await dbContext.Categories.ToListAsync();
                
        }

        public async Task<Catogrey?> GetByID(Guid id)
        {
           return await dbContext.Categories.FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<Catogrey> Updateasync(Catogrey catogrey)
        {
           var ExistingCetogrey =  await dbContext.Categories.FirstOrDefaultAsync(c => c.Id == catogrey.Id);

            if (ExistingCetogrey !=null)
            {
                dbContext.Entry(ExistingCetogrey).CurrentValues.SetValues(catogrey);
                await dbContext.SaveChangesAsync();
                return ExistingCetogrey;
            }
            return null;
        }

        public async Task<Catogrey?> Deleteasync(Guid id)
        {
            var ExistngCetogrey = await dbContext.Categories.FirstOrDefaultAsync(x => x.Id == id);
                { 
                if (ExistngCetogrey == null)
                {
                    return null;
                }

                dbContext.Categories.Remove(ExistngCetogrey);
                dbContext.SaveChangesAsync();

                return ExistngCetogrey;

            }
        }
    }
}
