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

        public ImageRepository(IWebHostEnvironment webHostEnvironment, IHttpContextAccessor httpContextAccessor, ApplicationDbContext dbContext)
        {
            this.webHostEnvironment = webHostEnvironment;
            this.httpContextAccessor = httpContextAccessor;
            this.dbContext = dbContext;
        }

        public async Task<IEnumerable<BlogImage>> GetAll()
        {
            return await dbContext.BlogImages.ToListAsync();
        }

        public async Task<BlogImage> Upload(IFormFile file, BlogImage blogImage)
        {
            // Ensure Images folder exists
            var imagesFolder = Path.Combine(webHostEnvironment.ContentRootPath, "Images");
            if (!Directory.Exists(imagesFolder))
            {
                Directory.CreateDirectory(imagesFolder);
            }

            var localPath = Path.Combine(imagesFolder, $"{blogImage.Filename}{blogImage.FileExtention}");

            using (var stream = new FileStream(localPath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Build public URL
            var httpRequest = httpContextAccessor.HttpContext?.Request;
            if (httpRequest != null)
            {
                var urlPath = $"{httpRequest.Scheme}://{httpRequest.Host}{httpRequest.PathBase}/Images/{blogImage.Filename}{blogImage.FileExtention}";
                blogImage.Url = urlPath;
            }

            await dbContext.BlogImages.AddAsync(blogImage);
            await dbContext.SaveChangesAsync();
            return blogImage;
        }
    }
}
