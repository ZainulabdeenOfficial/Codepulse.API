using Codepulse.API.Data;
using Codepulse.API.Models.Domain;
using Codepulse.API.Models.DTO;
using Codepulse.API.Repositories.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Immutable;

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


        //Get Method: localhost:5000/api/categories
        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            var Cetagories = await categoeryRepository.GetAllAsync();
            // Map domain model to DTO
            var response = new List<CetogreyDto>();

            foreach (var catogrey in Cetagories)
            {
                response.Add(new CetogreyDto
                {
                    Id = catogrey.Id,
                    Name = catogrey.Name,
                    UrlHandle=catogrey.UrlHandle

                });


            }
            return Ok(response);

        }

    }

}
