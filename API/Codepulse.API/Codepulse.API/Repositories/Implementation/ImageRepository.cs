using Codepulse.API.Data;
using Codepulse.API.Models.Domain;
using Codepulse.API.Repositories.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Codepulse.API.Repositories.Implementation
{
    public class ImageRepository : IimageRepository
    {
        private readonly IWebHostEnvironment webHostEnvironment;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly ApplicationDbContext dbContext;

        public ImageRepository(IWebHostEnvironment webHostEnvironment,IHttpContextAccessor httpContextAccessor ,ApplicationDbContext dbContext)
        {
            this.webHostEnvironment = webHostEnvironment;
            this.httpContextAccessor = httpContextAccessor;
            this.dbContext = dbContext;
        }

        public async Task<IEnumerable<BlogImage>> GetAll()
        {
           return  await dbContext.BlogImages.ToListAsync();
        }

        public async Task<BlogImage> Upload(IFormFile file, BlogImage blogImage)
        {
            // Upload Image to api -Images

            var LocalPath = Path.Combine(webHostEnvironment.ContentRootPath, "Images", $"{blogImage.Filename}{blogImage.FileExtention}");

            using var stream = new FileStream(LocalPath,FileMode.Create);

            await file.CopyToAsync(stream);

            // Update the Databe 
            // https://Codepulse.com/images/somefile.jpeg

            var httprequest = httpContextAccessor.HttpContext.Request;
            var urlpath = $"{httprequest.Scheme}://{httprequest.Host}{httprequest.PathBase}/Images/{blogImage.Filename}{blogImage.FileExtention}";

            blogImage.Url = urlpath;

            dbContext.BlogImages.AddAsync(blogImage);

            await dbContext.SaveChangesAsync();
            return blogImage;

        }
    }
}
