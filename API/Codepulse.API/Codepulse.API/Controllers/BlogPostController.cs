using Codepulse.API.Models.Domain;
using Codepulse.API.Models.DTO;
using Codepulse.API.Repositories.Implementation;
using Codepulse.API.Repositories.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Codepulse.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogPostController : ControllerBase
    {
        private readonly IBlogPostRepository blogPostRepository;
        private readonly ICategoeryRepository categoeryRepository;

        public BlogPostController(IBlogPostRepository blogPostRepository, ICategoeryRepository categoeryRepository)
        {
            this.blogPostRepository = blogPostRepository;
            this.categoeryRepository = categoeryRepository;
        }



        //post :apibaseurl/api/blogpost

        [HttpPost]
        [Authorize(Roles ="Writer")]

        public async Task<IActionResult> CreateBlogPost([FromBody] AddBlogPostRequestDto request)
        {
            var Blogpost = new BlogPost
            {
                Author = request.Author,
                Content = request.Content,
                FeaturedImageUrl = request.FeaturedImageUrl,
                IsVisible = request.IsVisible,
                PublishedDate = request.PublishedDate,
                ShortDescription = request.ShortDescription,
                Title = request.Title,
                UrlHandle = request.UrlHandle,
                Cetagories = new List<Catogrey>()
            };

            foreach (var CetagoryGuid in request.Categoires)
            {
                var ExisitingCetogrey = await categoeryRepository.GetByIDAsync(CetagoryGuid);

                if (Blogpost.Cetagories is not null)
                {
                    Blogpost.Cetagories.Add(ExisitingCetogrey);
                }
            }

            Blogpost = await blogPostRepository.createaysn(Blogpost);

            // Convert the domain model to DTO 

            var response = new BlogPostDto
            {
                ID = Blogpost.ID,
                Title = Blogpost.Title,
                ShortDescription = Blogpost.ShortDescription,
                Content = Blogpost.Content,
                FeaturedImageUrl = Blogpost.FeaturedImageUrl,
                UrlHandle = Blogpost.UrlHandle,
                PublishedDate = Blogpost.PublishedDate,
                Author = Blogpost.Author,
                IsVisible = Blogpost.IsVisible,

                Cetagories = Blogpost.Cetagories.Select(x => new CetogreyDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    UrlHandle = x.UrlHandle,
                }).ToList(),

            };

            return Ok(response);

        }

        //get all Blogpost 
        //apibaseurl/api/blogpost

        [HttpGet]
        public async Task<IActionResult> GetAllBlogPosts()
        {

            var blogpost = await blogPostRepository.GetAllAsync();

            // Convert model to DTO

            var respone = new List<BlogPostDto>();

            foreach (var Blogpost in blogpost)
            {
                respone.Add(new BlogPostDto
                {
                    ID = Blogpost.ID,
                    Title = Blogpost.Title,
                    ShortDescription = Blogpost.ShortDescription,
                    Content = Blogpost.Content,
                    FeaturedImageUrl = Blogpost.FeaturedImageUrl,
                    UrlHandle = Blogpost.UrlHandle,
                    PublishedDate = Blogpost.PublishedDate,
                    Author = Blogpost.Author,
                    IsVisible = Blogpost.IsVisible,
                    Cetagories = Blogpost.Cetagories.Select(x => new CetogreyDto
                    {
                        Id = x.Id,
                        Name = x.Name,
                        UrlHandle = x.UrlHandle,
                    }).ToList(),


                });

            }
            return Ok(respone);

        }




        //Get : apibaseurl/api/blogpost{id}

        [HttpGet("{id:guid}")]

        public async Task<IActionResult> getBlogpostById([FromRoute] Guid id)
        {

            // Get blogpost from reposties
            var Blogpost = await blogPostRepository.GetByIDAsync(id);
            if (Blogpost == null)
            {
                return NotFound();
            }
            var response = new BlogPostDto
            {
                ID = Blogpost.ID,
                Title = Blogpost.Title,
                ShortDescription = Blogpost.ShortDescription,
                Content = Blogpost.Content,
                FeaturedImageUrl = Blogpost.FeaturedImageUrl,
                UrlHandle = Blogpost.UrlHandle,
                PublishedDate = Blogpost.PublishedDate,
                Author = Blogpost.Author,
                IsVisible = Blogpost.IsVisible,

                Cetagories = Blogpost.Cetagories.Select(x => new CetogreyDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    UrlHandle = x.UrlHandle,
                }).ToList(),


            };
            return Ok(response);
        }


        //Get : apibaseurl/api/blogpost/ByUrl/{urlhandle}
        [HttpGet]
        [Route("ByUrl/{urlhandle}")]
        public async Task <IActionResult> GetAllBlogpostByUrlHanlde([FromRoute]string urlhandle)
        {
            // Get Blogpost from reposties
          var Blogpost =    await blogPostRepository.GetByUrlHandleAsync(urlhandle);
            if (Blogpost == null)
            {
                return NotFound();
            }
            var response = new BlogPostDto
            {
                ID = Blogpost.ID,
                Title = Blogpost.Title,
                ShortDescription = Blogpost.ShortDescription,
                Content = Blogpost.Content,
                FeaturedImageUrl = Blogpost.FeaturedImageUrl,
                UrlHandle = Blogpost.UrlHandle,
                PublishedDate = Blogpost.PublishedDate,
                Author = Blogpost.Author,
                IsVisible = Blogpost.IsVisible,

                Cetagories = Blogpost.Cetagories.Select(x => new CetogreyDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    UrlHandle = x.UrlHandle,
                }).ToList(),


            };
            return Ok(response);



        }

        //put {apibaseurl}/api/blogpost/{id}
        [HttpPut("{id:guid}")]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> UpdateBlogpostbyID([FromRoute] Guid id, UpdateBlogpostRequestDto request)
        {
            // convert dto to  domain model
            var Blogpost = new BlogPost
            {
                ID = id,
                Author = request.Author,
                Content = request.Content,
                FeaturedImageUrl = request.FeaturedImageUrl,
                IsVisible = request.IsVisible,
                PublishedDate = request.PublishedDate,
                ShortDescription = request.ShortDescription,
                Title = request.Title,
                UrlHandle = request.UrlHandle,
                Cetagories = new List<Catogrey>()
            };
            // foreach loop 
            foreach (var CetogreyGuid in request.Categoires)
            {
                var ExistingCetogrey = await categoeryRepository.GetByIDAsync(CetogreyGuid);

                if (ExistingCetogrey != null)
                {
                    Blogpost.Cetagories.Add(ExistingCetogrey);
                }

            }
            // call update repository to  update domain model 

            var UpdatedBlogPost = await blogPostRepository.UpdateAysnc(Blogpost);

            // Domain Model to DTo 
            var respone = new BlogPostDto
            {
                ID = Blogpost.ID,
                Title = Blogpost.Title,
                ShortDescription = Blogpost.ShortDescription,
                Content = Blogpost.Content,
                FeaturedImageUrl = Blogpost.FeaturedImageUrl,
                UrlHandle = Blogpost.UrlHandle,
                PublishedDate = Blogpost.PublishedDate,
                Author = Blogpost.Author,
                IsVisible = Blogpost.IsVisible,

                Cetagories = Blogpost.Cetagories.Select(x => new CetogreyDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    UrlHandle = x.UrlHandle,
                }).ToList(),
            };

            return Ok(respone);

        }
        //Delete {apibaseurl}/api/blogpost/{id}
        [HttpDelete("{id:guid}")]
        [Authorize(Roles = "Writer")]
        public async Task<IActionResult> DeleteBlogPost([FromRoute] Guid id)
        {
                var DeletedBlogPost = await blogPostRepository.DeleteAysnc(id);

            if (DeletedBlogPost == null) { 
            
            return NotFound();
            
            }

            var respone = new BlogPostDto
            {
                ID = DeletedBlogPost.ID,
                Title = DeletedBlogPost.Title,
                ShortDescription = DeletedBlogPost.ShortDescription,
                Content = DeletedBlogPost.Content,
                FeaturedImageUrl = DeletedBlogPost.FeaturedImageUrl,
                UrlHandle = DeletedBlogPost.UrlHandle,
                PublishedDate = DeletedBlogPost.PublishedDate,
                Author = DeletedBlogPost.Author,
                IsVisible = DeletedBlogPost.IsVisible,
            };
            return Ok(respone);
        }

     }

}
