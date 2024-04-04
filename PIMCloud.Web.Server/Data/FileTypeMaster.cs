using System;
using System.Collections.Generic;

namespace PIMCloud.Web.Server.Data;

public partial class FileTypeMaster
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<File> Files { get; set; } = new List<File>();

    public virtual ICollection<Icon> Icons { get; set; } = new List<Icon>();
}
