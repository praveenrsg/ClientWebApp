using PIMCloud.Web.Server.Data;

namespace PIMCloud.Web.Server.Services.UserServices
{
    public interface IUserService
    {
        List<AspNetUser> GetAllUsers();
    }
}
