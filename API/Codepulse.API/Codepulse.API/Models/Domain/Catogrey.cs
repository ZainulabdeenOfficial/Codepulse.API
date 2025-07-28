namespace Codepulse.API.Models.Domain
{
    public class Catogrey
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string UrlHandle { get; set; }

        public ICollection <BlogPost> BlogPosts { get; set; }


    }
}
