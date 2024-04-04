using System;
using System.Collections.Generic;

namespace PIMCloud.Web.Server.Data;

public partial class TreeViewNodeDetail
{
    public int Id { get; set; }

    public int ParentTreeViewNodeId { get; set; }

    public int ObjectId { get; set; }

    public long? ObjectDetailId { get; set; }

    public string Name { get; set; } = null!;

    public int SortOrder { get; set; }

    public virtual Object Object { get; set; } = null!;
}
