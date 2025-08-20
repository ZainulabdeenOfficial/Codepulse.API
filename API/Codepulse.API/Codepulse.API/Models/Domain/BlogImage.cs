namespace Codepulse.API.Models.Domain
{
    public class BlogImage
    {
        public Guid id { get; set; }

        public string Filename { get; set; }

        public string FileExtention { get; set; }

        public string Title { get; set; }

        public string Url { get; set; }

        public DateTime DateCreated { get; set; }

    }
}
