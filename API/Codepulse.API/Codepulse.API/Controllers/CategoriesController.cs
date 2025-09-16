using Codepulse.API.Data;
using Codepulse.API.Models.Domain;
using Codepulse.API.Models.DTO;
using Codepulse.API.Repositories.Implementation;
using Codepulse.API.Repositories.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;
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
        [Authorize(Roles = "Writer")]

        public async Task<IActionResult> CreateCatogrey([FromBody] CreateCategoryRequestDto request)
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
                    UrlHandle = catogrey.UrlHandle

                });


            }
            return Ok(response);

        }
        //Get Method: localhost:5000/api/categories/{id}

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetCetagoreyById([FromRoute] Guid id)
        {

            var ExistingCetagorey = await categoeryRepository.GetByIDAsync(id);

            if (ExistingCetagorey is null)
            {
                return NotFound();
            }
            var response = new CetogreyDto
            {
                Id = id,
                Name = ExistingCetagorey.Name,
                UrlHandle = ExistingCetagorey.UrlHandle
            };

            return Ok(response);

        }


        //put method : localhost:5000/api/categories/{id}
        [HttpPut("{id:guid}")]
        [Authorize(Roles = "Writer")]

        public async Task<IActionResult> EditCetagorey([FromRoute] Guid id, updateCetogreyRequestDto request) {

            // Convert dto to domain model 
            var Cetagorey = new Catogrey
            {
                Id = id,
                Name = request.Name,
                UrlHandle = request.UrlHandle
            };

            await categoeryRepository.Updateasync(Cetagorey);
            if (Cetagorey is null)
            {
                return NotFound();
            }
            // Map domain model to DTO
            var response = new CetogreyDto
            {
                Id = id,
                Name = Cetagorey.Name,
                UrlHandle = Cetagorey.UrlHandle
            };
            return Ok(response);


        }

        //Delete Method: localhost:5000/api/categories/{id}
        [HttpDelete("{id:guid}")]
        [Authorize(Roles = "Writer")]

        public async Task<IActionResult> DeleteCetogery([FromRoute] Guid id )
        {
         var CetogreyDeleted =    await categoeryRepository.Deleteasync(id);
            if (CetogreyDeleted ==null)
            {
                 return NotFound();
            }

            // Map domain model to DTO

            var response = new CetogreyDto
            {
                Id = CetogreyDeleted.Id,
                Name = CetogreyDeleted.Name,
                UrlHandle = CetogreyDeleted.UrlHandle
            };
            return Ok(response);


        }




    } 

    

}