using System;
using System.Collections.Generic;

namespace PIMCloud.Web.Server.Data;

public partial class LocaleMaster
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string ShortCode { get; set; } = null!;

    public bool IsActive { get; set; }

    public virtual ICollection<ObjectDetail> ObjectDetails { get; set; } = new List<ObjectDetail>();
}
