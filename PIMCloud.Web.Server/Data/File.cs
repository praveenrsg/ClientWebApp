using System;
using System.Collections.Generic;

namespace PIMCloud.Web.Server.Data;

public partial class File
{
    public int Id { get; set; }

    public int FileTypeMasterId { get; set; }

    public string FileName { get; set; } = null!;

    public string FilePath { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public bool IsDeleted { get; set; }

    public string AspNetUserId { get; set; } = null!;

    public virtual FileTypeMaster FileTypeMaster { get; set; } = null!;
}
