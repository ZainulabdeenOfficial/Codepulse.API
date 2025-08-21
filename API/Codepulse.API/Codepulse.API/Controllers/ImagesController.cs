using Codepulse.API.Models.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Codepulse.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        // Post: {apibaseurl}/api/Images

        [HttpPost]

        public Task<IActionResult> UploadImage([FromForm] IFormFile file, [FromForm] string filename,
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
