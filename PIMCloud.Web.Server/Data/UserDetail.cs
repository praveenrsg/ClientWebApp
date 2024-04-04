using System;
using System.Collections.Generic;

namespace PIMCloud.Web.Server.Data;

public partial class UserDetail
{
    public int Id { get; set; }

    public string AspNetUserId { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public DateTime CreatedAt { get; set; }

    public virtual AspNetUser AspNetUser { get; set; } = null!;
}
