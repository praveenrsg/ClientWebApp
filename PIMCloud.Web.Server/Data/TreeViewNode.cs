using System;
using System.Collections.Generic;

namespace PIMCloud.Web.Server.Data;

public partial class TreeViewNode
{
    public int Id { get; set; }

    public int ObjectId { get; set; }

    public string Name { get; set; } = null!;

    public int SortOrder { get; set; }

    public virtual Object Object { get; set; } = null!;
}
