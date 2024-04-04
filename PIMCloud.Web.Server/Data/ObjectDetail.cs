using System;
using System.Collections.Generic;

namespace PIMCloud.Web.Server.Data;

public partial class ObjectDetail
{
    public long Id { get; set; }

    public int ParentObjectId { get; set; }

    public int? ReferencedObjectId { get; set; }

    public int? DataTypeId { get; set; }

    public int LocaleId { get; set; }

    public string? Precision { get; set; }

    public string? CustomData { get; set; }

    public int SortOrder { get; set; }

    public int? IconId { get; set; }

    public DateTime CreatedAt { get; set; }

    public bool IsActive { get; set; }

    public string? AspNetUsersId { get; set; }

    public virtual DataTypeMaster? DataType { get; set; }

    public virtual LocaleMaster Locale { get; set; } = null!;

    public virtual ICollection<ObjectDatum> ObjectData { get; set; } = new List<ObjectDatum>();

    public virtual Object ParentObject { get; set; } = null!;

    public virtual Object? ReferencedObject { get; set; }
}
