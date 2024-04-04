using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PIMCloud.Web.Server.Services.UserServices;

namespace PIMCloud.Web.Server.Controllers
{
    [ApiController]
    [Route("[controller]"), Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet(Name = "GetAllUsers")]
        public IEnumerable<dynamic> Get()
        {
            var dataRet = _userService.GetAllUsers();

            return dataRet;
        }
    }
}
