using System;
using System.Collections.Generic;

namespace PIMCloud.Web.Server.Data;

public partial class Icon
{
    public int Id { get; set; }

    public int FileTypeMasterId { get; set; }

    public string IconName { get; set; } = null!;

    public string IconCode { get; set; } = null!;

    public bool IsActive { get; set; }

    public virtual FileTypeMaster FileTypeMaster { get; set; } = null!;
}
