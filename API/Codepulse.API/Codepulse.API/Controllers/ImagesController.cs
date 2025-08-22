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

        // Post: {apibaseurl}/api/Images
        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UploadImage(IFormFile file, [FromForm] string filename,
            [FromForm] string title)
        {
            ValidateFileUpload(file);

            if (ModelState.IsValid) {

                // File Upload
                var blogImage = new BlogImage
                {
                    FileExtention = Path.GetExtension(file.FileName).ToLower(),
                    Filename = string.IsNullOrWhiteSpace(filename) ? Path.GetFileNameWithoutExtension(file.FileName) : filename,
                    Title = title,
                    DateCreated = DateTime.Now
                };

                blogImage = await iimageRepository.Upload(file, blogImage);

                // Convert domain model to dto
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
            else
            {
                return BadRequest(ModelState);
            }
        }

        private void ValidateFileUpload(IFormFile file)
        {
            var allowEdextentions = new string[] { ".jpg", ".png", ".jpeg" };

            if (!allowEdextentions.Contains(Path.GetExtension(file.FileName).ToLower()))
            {
                ModelState.AddModelError("file", "Unsupport File Format");
            }

            if (file.Length > 10485760)
            {
                ModelState.AddModelError("file", "File Size cannot be more than 10 MB");
            }
        }

    }
}
