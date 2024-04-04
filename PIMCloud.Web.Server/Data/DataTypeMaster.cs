using System;
using System.Collections.Generic;

namespace PIMCloud.Web.Server.Data;

public partial class DataTypeMaster
{
    public int Id { get; set; }

    public string DataTypeName { get; set; } = null!;

    public string Sqltype { get; set; } = null!;

    public bool IsActive { get; set; }

    public virtual ICollection<ObjectDetail> ObjectDetails { get; set; } = new List<ObjectDetail>();
}
