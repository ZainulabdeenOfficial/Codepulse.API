using Codepulse.API.Models.Domain;

namespace Codepulse.API.Repositories.Interface
{
    public interface ICategoeryRepository
    {
        Task<Catogrey> CreateAysnc(Catogrey catogrey);
    }
}
