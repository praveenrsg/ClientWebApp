using System;
using System.Collections.Generic;

namespace PIMCloud.Web.Server.Data;

public partial class ReferenceItem
{
    public long Id { get; set; }

    public string Identifier { get; set; } = null!;

    public virtual ICollection<ObjectDatum> ObjectData { get; set; } = new List<ObjectDatum>();
}
