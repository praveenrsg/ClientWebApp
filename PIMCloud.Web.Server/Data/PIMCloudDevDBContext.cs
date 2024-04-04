using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace PIMCloud.Web.Server.Data;

public partial class PIMCloudDevDBContext : IdentityDbContext
{

    public PIMCloudDevDBContext(DbContextOptions<PIMCloudDevDBContext> options)
        : base(options)
    {
    }

    
}
