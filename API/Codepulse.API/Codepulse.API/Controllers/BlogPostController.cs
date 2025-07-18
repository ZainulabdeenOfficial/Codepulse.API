using Codepulse.API.Models.Domain;
using Codepulse.API.Models.DTO;
using Codepulse.API.Repositories.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Codepulse.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogPostController : ControllerBase
{
        private readonly IBlogPostRepository blogPostRepository;

        public BlogPostController(IBlogPostRepository blogPostRepository)
        {
            this.blogPostRepository = blogPostRepository;
        }



        //post :apibaseurl/api/blogpost

        [HttpPost]

        public async Task<IActionResult> CreateBlogPost([FromBody]AddBlogPostRequestDto request)
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
            };

          Blogpost =  await blogPostRepository.createaysn(Blogpost);

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
                IsVisible = Blogpost.IsVisible

            };

            return Ok (response);

        }

    }
}
