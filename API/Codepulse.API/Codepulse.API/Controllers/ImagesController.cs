using Codepulse.API.Models.Domain;
using Codepulse.API.Models.DTO;
using Codepulse.API.Repositories.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Codepulse.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly IimageRepository iimageRepository;

        public ImagesController(IimageRepository iimageRepository)
        {
            this.iimageRepository = iimageRepository;
        }

        // GET: {apibaseurl}/api/Images
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var images = await iimageRepository.GetAll();

            var response = new List<BlogImageDto>();
            foreach (var image in images)
            {
                response.Add(new BlogImageDto
                {
                    id = image.id,
                    Title = image.Title,
                    DateCreated = image.DateCreated,
                    FileExtention = image.FileExtention,
                    Filename = image.Filename,
                    Url = image.Url,
                });
            }
            return Ok(response);
        }

        // POST: {apibaseurl}/api/Images
        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UploadImage(IFormFile file, [FromForm] string filename, [FromForm] string title)
        {
            ValidateFileUpload(file);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var blogImage = new BlogImage
            {
                FileExtention = Path.GetExtension(file.FileName).ToLower(),
                Filename = string.IsNullOrWhiteSpace(filename) ? Path.GetFileNameWithoutExtension(file.FileName) : filename,
                Title = title,
                DateCreated = DateTime.Now
            };

            blogImage = await iimageRepository.Upload(file, blogImage);

            var response = new BlogImageDto
            {
                id = blogImage.id,
                Title = blogImage.Title,
                DateCreated = blogImage.DateCreated,
                FileExtention = blogImage.FileExtention,
                Filename = blogImage.Filename,
                Url = blogImage.Url,
            };

            return Ok(response);
        }

        private void ValidateFileUpload(IFormFile file)
        {
            var allowEdextentions = new string[] { ".jpg", ".png", ".jpeg" };

            if (file == null)
            {
                ModelState.AddModelError("file", "File is required");
                return;
            }

            if (!allowEdextentions.Contains(Path.GetExtension(file.FileName).ToLower()))
            {
                ModelState.AddModelError("file", "Unsupported file format");
            }

            if (file.Length > 10485760)
            {
                ModelState.AddModelError("file", "File size cannot be more than 10 MB");
            }
        }
    }
}
