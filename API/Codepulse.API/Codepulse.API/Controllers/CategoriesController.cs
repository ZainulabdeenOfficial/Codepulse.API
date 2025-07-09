using Codepulse.API.Data;
using Codepulse.API.Models.Domain;
using Codepulse.API.Models.DTO;
using Codepulse.API.Repositories.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Codepulse.API.Controllers
{

    // localhost:5000/api/categories
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoeryRepository categoeryRepository;

        public CategoriesController(ICategoeryRepository categoeryRepository)
        {
            this.categoeryRepository = categoeryRepository;
        }






        //post Method: localhost:5000/api/categories

        [HttpPost]

        public async Task<IActionResult> CreateCatogrey( CreateCategoryRequestDto request)
        {

            //Map DTO to domain model 

            var catogrey = new Catogrey
            {
                Name = request.Name,
                UrlHandle = request.UrlHandle,
            };

             await categoeryRepository.CreateAysnc(catogrey);

            // Domain model to DTO

            var respone = new CetogreyDto
            {
                Id = catogrey.Id,
                Name = catogrey.Name,
                UrlHandle = catogrey.UrlHandle
            };

            return Ok(respone);



        }

    }
}
