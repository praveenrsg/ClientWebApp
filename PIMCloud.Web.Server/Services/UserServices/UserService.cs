using PIMCloud.Web.Server.Data;

namespace PIMCloud.Web.Server.Services.UserServices
{
    public class UserService : IUserService
    {
        private readonly PIMCloudDevContext _context;

        public UserService( PIMCloudDevContext pimcloudDevContext)
        {
            _context = pimcloudDevContext;
        }
        public List<AspNetUser> GetAllUsers()
        {
            var data = _context.AspNetUsers.ToList();
            return data;
        }

    }
}

