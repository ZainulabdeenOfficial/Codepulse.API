using Codepulse.API.Models.Domain;

namespace Codepulse.API.Repositories.Interface
{
    public interface IimageRepository
    {
      Task <BlogImage> Upload(IFormFile file, BlogImage blogImage);
    }
}
