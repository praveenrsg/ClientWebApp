using System;
using System.Collections.Generic;

namespace PIMCloud.Web.Server.Data;

public partial class Object
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? CustomPrefix { get; set; }

    public string? CustomSuffix { get; set; }

    public int SortOrder { get; set; }

    public DateTime CreatedAt { get; set; }

    public bool IsActive { get; set; }

    public string AspNetUsersId { get; set; } = null!;

    public virtual ICollection<AllowedObject> AllowedObjectAllowedObjectNavigations { get; set; } = new List<AllowedObject>();

    public virtual ICollection<AllowedObject> AllowedObjectObjects { get; set; } = new List<AllowedObject>();

    public virtual ICollection<AllowedReferenceObject> AllowedReferenceObjects { get; set; } = new List<AllowedReferenceObject>();

    public virtual ICollection<ObjectDatum> ObjectData { get; set; } = new List<ObjectDatum>();

    public virtual ICollection<ObjectDetail> ObjectDetailParentObjects { get; set; } = new List<ObjectDetail>();

    public virtual ICollection<ObjectDetail> ObjectDetailReferencedObjects { get; set; } = new List<ObjectDetail>();

    public virtual ICollection<TreeViewNodeDetail> TreeViewNodeDetails { get; set; } = new List<TreeViewNodeDetail>();

    public virtual ICollection<TreeViewNode> TreeViewNodes { get; set; } = new List<TreeViewNode>();
}
