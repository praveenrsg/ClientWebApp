using System;
using System.Collections.Generic;

namespace PIMCloud.Web.Server.Data;

public partial class ObjectDatum
{
    public long Id { get; set; }

    public long ReferenceItemId { get; set; }

    public int ObjectId { get; set; }

    public long ObjectDetailId { get; set; }

    public byte[]? Value { get; set; }

    public DateTime CreatedAt { get; set; }

    public bool IsActive { get; set; }

    public string? AspNetUsersId { get; set; }

    public virtual Object Object { get; set; } = null!;

    public virtual ObjectDetail ObjectDetail { get; set; } = null!;

    public virtual ReferenceItem ReferenceItem { get; set; } = null!;
}
