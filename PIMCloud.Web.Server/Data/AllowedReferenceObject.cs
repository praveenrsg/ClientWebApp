using System;
using System.Collections.Generic;

namespace PIMCloud.Web.Server.Data;

public partial class AllowedReferenceObject
{
    public int Id { get; set; }

    public int ObjectId { get; set; }

    public int AllowedReferenceObjectId { get; set; }

    public virtual Object Object { get; set; } = null!;
}
