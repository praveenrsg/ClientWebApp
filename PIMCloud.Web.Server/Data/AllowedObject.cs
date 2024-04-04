using System;
using System.Collections.Generic;

namespace PIMCloud.Web.Server.Data;

public partial class AllowedObject
{
    public int Id { get; set; }

    public int ObjectId { get; set; }

    public int AllowedObjectId { get; set; }

    public virtual Object AllowedObjectNavigation { get; set; } = null!;

    public virtual Object Object { get; set; } = null!;
}
