using System;
using System.Collections.Generic;

namespace PIMCloud.Web.Server.Data;

public partial class ObjectMaster
{
    public int Id { get; set; }

    public string ObjectType { get; set; } = null!;

    public string ObjectName { get; set; } = null!;

    public string ObjectDescription { get; set; } = null!;
}
