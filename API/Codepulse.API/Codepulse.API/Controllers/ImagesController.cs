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

        public async Task<IActionResult> UploadImage([FromForm] IFormFile file, [FromForm] string filename,
            [FromForm] string title)
        {
            ValidateFileUpload(file);

            if (ModelState.IsValid) {

                // File Upload

                var BloggImage = new BlogImage
                {
                 
                 FileExtention = Path.GetExtension(filename).ToLower(),
                 Filename = filename,
                 Title = title,
                 DateCreated = DateTime.Now
                };

                BloggImage =   await iimageRepository.Upload(file, BloggImage);

                // Convert domain model to dto
                var response = new BlogImageDto
                {
                   id = BloggImage.id,
                   Title = BloggImage.Title,
                   DateCreated = BloggImage.DateCreated,
                   FileExtention = BloggImage.FileExtention,
                   Filename = BloggImage.Filename,
                   Url = BloggImage.Url,
                };

                return Ok (BloggImage);

            }

            else
            {
                return BadRequest(ModelState);
            }




        }

        private void ValidateFileUpload(IFormFile file)
        {
            var allowEdextentions = new string[] { ".jpg", ".png", "jpeg" };

            if (!allowEdextentions.Contains(Path.GetExtension(file.FileName).ToLower()))
            {
                ModelState.AddModelError("file", "Unsupport File Format");
                
            }

            if (file.Length>10485760)
            {
                ModelState.AddModelError("file", "File Size cannot be more than 10 MB");
            }

        }

    }
}
