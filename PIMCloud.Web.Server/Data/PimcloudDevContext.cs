using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace PIMCloud.Web.Server.Data;

public partial class PIMCloudDevContext : DbContext
{
    public PIMCloudDevContext()
    {
    }

    public PIMCloudDevContext(DbContextOptions<PIMCloudDevContext> options)
        : base(options)
    {
    }

    public virtual DbSet<AllowedObject> AllowedObjects { get; set; }

    public virtual DbSet<AllowedReferenceObject> AllowedReferenceObjects { get; set; }

    public virtual DbSet<AspNetRole> AspNetRoles { get; set; }

    public virtual DbSet<AspNetRoleClaim> AspNetRoleClaims { get; set; }

    public virtual DbSet<AspNetUser> AspNetUsers { get; set; }

    public virtual DbSet<AspNetUserClaim> AspNetUserClaims { get; set; }

    public virtual DbSet<AspNetUserLogin> AspNetUserLogins { get; set; }

    public virtual DbSet<AspNetUserToken> AspNetUserTokens { get; set; }

    public virtual DbSet<DataTypeMaster> DataTypeMasters { get; set; }

    public virtual DbSet<File> Files { get; set; }

    public virtual DbSet<FileTypeMaster> FileTypeMasters { get; set; }

    public virtual DbSet<Icon> Icons { get; set; }

    public virtual DbSet<LocaleMaster> LocaleMasters { get; set; }

    public virtual DbSet<Object> Objects { get; set; }

    public virtual DbSet<ObjectDatum> ObjectData { get; set; }

    public virtual DbSet<ObjectDetail> ObjectDetails { get; set; }

    public virtual DbSet<ReferenceItem> ReferenceItems { get; set; }

    public virtual DbSet<TreeViewNode> TreeViewNodes { get; set; }

    public virtual DbSet<TreeViewNodeDetail> TreeViewNodeDetails { get; set; }

    public virtual DbSet<UserDetail> UserDetails { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=tcp:pimcloud.database.windows.net,1433; Database=pimCloud; Persist Security Info=False; User Id=dch; Password=Ejh3023jZss201!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AllowedObject>(entity =>
        {
            entity.ToTable("AllowedObject");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.AllowedObjectId).ValueGeneratedOnAdd();

            entity.HasOne(d => d.AllowedObjectNavigation).WithMany(p => p.AllowedObjectAllowedObjectNavigations)
                .HasForeignKey(d => d.AllowedObjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AllowedObject_Object");

            entity.HasOne(d => d.Object).WithMany(p => p.AllowedObjectObjects)
                .HasForeignKey(d => d.ObjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AllowedObject_AllowedObject");
        });

        modelBuilder.Entity<AllowedReferenceObject>(entity =>
        {
            entity.ToTable("AllowedReferenceObject");

            entity.HasOne(d => d.Object).WithMany(p => p.AllowedReferenceObjects)
                .HasForeignKey(d => d.ObjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AllowedReferenceObject_Object");
        });

        modelBuilder.Entity<AspNetRole>(entity =>
        {
            entity.HasIndex(e => e.NormalizedName, "RoleNameIndex")
                .IsUnique()
                .HasFilter("([NormalizedName] IS NOT NULL)");

            entity.Property(e => e.Name).HasMaxLength(256);
            entity.Property(e => e.NormalizedName).HasMaxLength(256);
        });

        modelBuilder.Entity<AspNetRoleClaim>(entity =>
        {
            entity.HasIndex(e => e.RoleId, "IX_AspNetRoleClaims_RoleId");

            entity.HasOne(d => d.Role).WithMany(p => p.AspNetRoleClaims).HasForeignKey(d => d.RoleId);
        });

        modelBuilder.Entity<AspNetUser>(entity =>
        {
            entity.HasIndex(e => e.NormalizedEmail, "EmailIndex");

            entity.HasIndex(e => e.NormalizedUserName, "UserNameIndex")
                .IsUnique()
                .HasFilter("([NormalizedUserName] IS NOT NULL)");

            entity.Property(e => e.Email).HasMaxLength(256);
            entity.Property(e => e.NormalizedEmail).HasMaxLength(256);
            entity.Property(e => e.NormalizedUserName).HasMaxLength(256);
            entity.Property(e => e.UserName).HasMaxLength(256);

            entity.HasMany(d => d.Roles).WithMany(p => p.Users)
                .UsingEntity<Dictionary<string, object>>(
                    "AspNetUserRole",
                    r => r.HasOne<AspNetRole>().WithMany().HasForeignKey("RoleId"),
                    l => l.HasOne<AspNetUser>().WithMany().HasForeignKey("UserId"),
                    j =>
                    {
                        j.HasKey("UserId", "RoleId");
                        j.ToTable("AspNetUserRoles");
                        j.HasIndex(new[] { "RoleId" }, "IX_AspNetUserRoles_RoleId");
                    });
        });

        modelBuilder.Entity<AspNetUserClaim>(entity =>
        {
            entity.HasIndex(e => e.UserId, "IX_AspNetUserClaims_UserId");

            entity.HasOne(d => d.User).WithMany(p => p.AspNetUserClaims).HasForeignKey(d => d.UserId);
        });

        modelBuilder.Entity<AspNetUserLogin>(entity =>
        {
            entity.HasKey(e => new { e.LoginProvider, e.ProviderKey });

            entity.HasIndex(e => e.UserId, "IX_AspNetUserLogins_UserId");

            entity.HasOne(d => d.User).WithMany(p => p.AspNetUserLogins).HasForeignKey(d => d.UserId);
        });

        modelBuilder.Entity<AspNetUserToken>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.LoginProvider, e.Name });

            entity.HasOne(d => d.User).WithMany(p => p.AspNetUserTokens).HasForeignKey(d => d.UserId);
        });

        modelBuilder.Entity<DataTypeMaster>(entity =>
        {
            entity.ToTable("DataTypeMaster");

            entity.Property(e => e.DataTypeName).HasMaxLength(50);
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.Sqltype)
                .HasMaxLength(50)
                .HasColumnName("SQLType");
        });

        modelBuilder.Entity<File>(entity =>
        {
            entity.ToTable("File");

            entity.Property(e => e.AspNetUserId).HasMaxLength(450);
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.FileName).HasMaxLength(50);
            entity.Property(e => e.UpdatedAt).HasColumnType("datetime");

            entity.HasOne(d => d.FileTypeMaster).WithMany(p => p.Files)
                .HasForeignKey(d => d.FileTypeMasterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_File_FileTypeMaster");
        });

        modelBuilder.Entity<FileTypeMaster>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_FileLocationType");

            entity.ToTable("FileTypeMaster");

            entity.Property(e => e.Name)
                .HasMaxLength(128)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Icon>(entity =>
        {
            entity.ToTable("Icon");

            entity.Property(e => e.IconName).HasMaxLength(50);
            entity.Property(e => e.IsActive).HasDefaultValue(true);

            entity.HasOne(d => d.FileTypeMaster).WithMany(p => p.Icons)
                .HasForeignKey(d => d.FileTypeMasterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Icon_FileTypeMaster");
        });

        modelBuilder.Entity<LocaleMaster>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Locale");

            entity.ToTable("LocaleMaster");

            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.Name)
                .HasMaxLength(20)
                .IsFixedLength();
            entity.Property(e => e.ShortCode)
                .HasMaxLength(10)
                .IsFixedLength();
        });

        modelBuilder.Entity<Object>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_ObjectMaster");

            entity.ToTable("Object");

            entity.Property(e => e.AspNetUsersId).HasMaxLength(450);
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.CustomPrefix)
                .HasMaxLength(128)
                .IsUnicode(false);
            entity.Property(e => e.CustomSuffix)
                .HasMaxLength(128)
                .IsUnicode(false);
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.Name)
                .HasMaxLength(128)
                .IsUnicode(false);
        });

        modelBuilder.Entity<ObjectDatum>(entity =>
        {
            entity.Property(e => e.AspNetUsersId).HasMaxLength(450);
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.IsActive).HasDefaultValue(true);

            entity.HasOne(d => d.ObjectDetail).WithMany(p => p.ObjectData)
                .HasForeignKey(d => d.ObjectDetailId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ObjectData_ObjectDetail");

            entity.HasOne(d => d.Object).WithMany(p => p.ObjectData)
                .HasForeignKey(d => d.ObjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ObjectData_Object");

            entity.HasOne(d => d.ReferenceItem).WithMany(p => p.ObjectData)
                .HasForeignKey(d => d.ReferenceItemId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ObjectData_ReferenceItem");
        });

        modelBuilder.Entity<ObjectDetail>(entity =>
        {
            entity.ToTable("ObjectDetail");

            entity.Property(e => e.AspNetUsersId).HasMaxLength(450);
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.CustomData).HasMaxLength(1024);
            entity.Property(e => e.Precision).HasMaxLength(50);

            entity.HasOne(d => d.DataType).WithMany(p => p.ObjectDetails)
                .HasForeignKey(d => d.DataTypeId)
                .HasConstraintName("FK_ObjectDetail_DataTypeMaster");

            entity.HasOne(d => d.Locale).WithMany(p => p.ObjectDetails)
                .HasForeignKey(d => d.LocaleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ObjectDetail_LocaleMaster");

            entity.HasOne(d => d.ParentObject).WithMany(p => p.ObjectDetailParentObjects)
                .HasForeignKey(d => d.ParentObjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ObjectDetail_Object");

            entity.HasOne(d => d.ReferencedObject).WithMany(p => p.ObjectDetailReferencedObjects)
                .HasForeignKey(d => d.ReferencedObjectId)
                .HasConstraintName("FK_ObjectDetail_Object1");
        });

        modelBuilder.Entity<ReferenceItem>(entity =>
        {
            entity.ToTable("ReferenceItem");

            entity.Property(e => e.Identifier)
                .HasMaxLength(256)
                .IsUnicode(false);
        });

        modelBuilder.Entity<TreeViewNode>(entity =>
        {
            entity.ToTable("TreeViewNode");

            entity.Property(e => e.Name)
                .HasMaxLength(128)
                .IsUnicode(false);

            entity.HasOne(d => d.Object).WithMany(p => p.TreeViewNodes)
                .HasForeignKey(d => d.ObjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TreeViewNode_Object");
        });

        modelBuilder.Entity<TreeViewNodeDetail>(entity =>
        {
            entity.ToTable("TreeViewNodeDetail");

            entity.Property(e => e.Name)
                .HasMaxLength(128)
                .IsUnicode(false);

            entity.HasOne(d => d.Object).WithMany(p => p.TreeViewNodeDetails)
                .HasForeignKey(d => d.ObjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TreeViewNodeDetail_Object");
        });

        modelBuilder.Entity<UserDetail>(entity =>
        {
            entity.ToTable("UserDetail");

            entity.Property(e => e.AspNetUserId).HasMaxLength(450);
            entity.Property(e => e.CreatedAt).HasColumnType("datetime");
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.AspNetUser).WithMany(p => p.UserDetails)
                .HasForeignKey(d => d.AspNetUserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_UserDetail_AspNetUsers");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
