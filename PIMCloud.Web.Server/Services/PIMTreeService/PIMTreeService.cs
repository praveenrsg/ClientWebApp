using PIMCloud.Web.Server.Data;
using System.Text;

namespace PIMCloud.Web.Server.Services.PIMTreeService
{
    public class PIMTreeService : IPIMTreeService
    {
        private readonly PIMCloudDevContext _context;

        public PIMTreeService(PIMCloudDevContext pimcloudDevContext)
        {
            _context = pimcloudDevContext;
        }
        public List<FolderItem> GetPIMTreeViewSample()
        {

            List<FolderItem> fileSystem = new List<FolderItem>
        {
            new FolderItem
            {
                key = "0",
                label = "Items 1",
                data = "Documents Folder",
                icon = "pi pi-fw pi-inbox",
                children = new List<FileItem>
                {
                    new FolderItem
                    {
                        key = "0-0",
                        label = "Work",
                        data = "Work Folder",
                        icon = "pi pi-fw pi-cog",
                        children = new List<FileItem>
                        {
                            new FileItem { key = "0-0-0", label = "Expenses.doc", icon = "pi pi-fw pi-file", data = "Expenses Document" },
                            new FileItem { key = "0-0-1", label = "Resume.doc", icon = "pi pi-fw pi-file", data = "Resume Document" }
                        }
                    },
                    new FolderItem
                    {
                        key = "0-1",
                        label = "Home",
                        data = "Home Folder",
                        icon = "pi pi-fw pi-home",
                        children = new List<FileItem>
                        {
                            new FileItem { key = "0-1-0", label = "Invoices.txt", icon = "pi pi-fw pi-file", data = "Invoices for this month" }
                        }
                    }
                }
            }
        };
            return fileSystem;
        }

        public List<FolderItem> GetPIMTreeView()
        {
            // Initialize the list to hold FolderItems
            List<FolderItem> fileSystem = new List<FolderItem>();

            // Query to fetch data from the database
            var result = from tvn in _context.TreeViewNodes
                         join ob in _context.Objects on tvn.ObjectId equals ob.Id
                         select new
                         {
                             TreeViewNodeId = tvn.Id,
                             TreeviewNodeName = tvn.Name,
                             ObjectName = ob.Name,
                             tvn.ObjectId
                         };

            // Iterate through the query results
            foreach (var child in result)
            {
                // Create a new FolderItem for each result
                FolderItem objFi = new FolderItem
                {
                    key = Convert.ToString(child.TreeViewNodeId),
                    label = child.TreeviewNodeName,
                    data = "Documents Folder",
                    icon = "pi pi-fw pi-inbox"
                };

                // Create children if needed
                var children = new List<FileItem>
                {
                   new FolderItem
                   {
                    key = "0-0",
                    label = child.ObjectName,
                    data = child.ObjectName,
                    icon = "pi pi-fw pi-cog",
                    children = new List<FileItem>()
                   }
                };

                // Assign children to the FolderItem
                objFi.children = children;

                // Add the FolderItem to the fileSystem list
                fileSystem.Add(objFi);
            }
            // Return the populated fileSystem list
            return fileSystem;
        }
        public List<FolderItemHello> GetTreeViewByNodeId(int nodeId)
        {

            var getActualNodeId = _context.ObjectDetails.FirstOrDefault(a => a.Id == nodeId);

            if (getActualNodeId == null)
            {
                return new List<FolderItemHello>(); // Return empty list if node not found
            }

            var iconCode = (from objDetail in _context.ObjectDetails
                              join obj in _context.Objects on objDetail.ParentObjectId equals obj.Id
                              join objIcon in _context.Icons on objDetail.IconId equals objIcon.Id into iconJoin
                              from objIcon in iconJoin.DefaultIfEmpty() // Perform left join to handle null IconId
                              where objDetail.Id == nodeId
                              select new
                              {
                                  ObjectDetailId = objDetail.Id,
                                  ObjectName = obj.Name,
                                  ParentObjectId = obj.Id,
                                  IconCode = objIcon.IconCode ?? "pi-image", // Use default icon if null
                              }).FirstOrDefault().IconCode;
           
            var resultListhello = GetParentAndChildrenHello(getActualNodeId.ParentObjectId);
            var getObjectData = _context.ObjectData.Where(a => a.ObjectId == resultListhello[0].ParentObjectId & a.ObjectDetailId == nodeId).ToList();
            return NewMethod(resultListhello, getObjectData, iconCode);
        }

        private List<FolderItemHello> NewMethod(List<FolderItemHello> resultList, List<ObjectDatum> getObjectData, string? IconCode)
        {
            int i = 0;
            var fileSystem = new List<FolderItemHello>();
            foreach (var oData in getObjectData)
            {
                var objFi = new FolderItemHello
                {
                    key = $"{oData.Id}-{oData.ObjectId}-{oData.ReferenceItemId}",
                    label = Encoding.ASCII.GetString((byte[])oData.Value),
                    data = Encoding.ASCII.GetString((byte[])oData.Value),
                    icon = "pi pi-fw " + IconCode,
                    children = new List<FolderItemHello>()
                };
                if (resultList.Count > 0)
                {
                    foreach (var item in resultList)
                        objFi.children.Add(item);
                }
                //foreach (var item in resultList.Where(r => r.ReferencedObjectName != null))
                //{
                //    objFi.children.Add(new FolderItem
                //    {
                //        key = Convert.ToString(i++) + '-' + Convert.ToString(item.ObjectId), // Changed the key generation to avoid duplicates
                //        label = item.ReferencedObjectName,
                //        data = item.ReferencedObjectName,
                //        icon = "pi pi-fw " + item.IconCode,
                //        children = new List<FileItem>()
                //    });
                //}

                fileSystem.Add(objFi);
            }

            return fileSystem;
        }

        public List<TreeViewNode<TreeViewNodeDetail>> GetTreeViewNodeList()
        {
            var groupedData = _context.TreeViewNodes
            .Join(
                _context.TreeViewNodeDetails,
                tvn => tvn.Id,
                tvnd => tvnd.ParentTreeViewNodeId,
                (tvn, tvnd) => new { TVN = tvn, TVND = tvnd }
            )
            .GroupBy(x => x.TVN.Name)
            .Select(group => new TreeViewNode<TreeViewNodeDetail>
            {
                Name = group.Key,
                Details = group.Select(x => new TreeViewNodeDetail
                {
                    Id = x.TVND.Id,
                    ObjectId = x.TVN.ObjectId,
                    ParentTreeViewNodeId = x.TVND.ParentTreeViewNodeId,
                    Name = x.TVND.Name,
                    ObjectDetailId = x.TVND.ObjectDetailId
                }).ToList()
            })
            .ToList();

            return groupedData;
        }
        public List<MYObjectDetail> GetObjectDetailsByObjId(int objId)
        {
           var ObjList= GetParentAndChildrenById(objId);
            return ObjList.ToList<MYObjectDetail>(); 
        }
        public object GetObjectById(int objId)
        {
            var queryList = (from ob in _context.Objects
                             where ob.Id == objId
                             join us in _context.AspNetUsers
                             on ob.AspNetUsersId equals us.Id
                             select new
                             {
                                 Id = ob.Id,
                                 Name = ob.Name,
                                 CustomPrefix = ob.CustomPrefix,
                                 CustomSuffix = ob.CustomSuffix,
                                 SortOrder = ob.SortOrder,
                                 CreatedAt = ob.CreatedAt,
                                 IsActive = ob.IsActive,
                                 Username = us.UserName
                             }).FirstOrDefault(); ;

            return queryList;
        }
        public string GetValueFromObjectData(int objId, int refId)
        {
            var result = (from OD in _context.ObjectData
                          join detail in _context.ObjectDetails
                          on OD.ObjectId equals detail.ParentObjectId
                          where OD.ReferenceItemId == refId &&
                                OD.ObjectId == objId &&
                                detail.DataTypeId != null
                          select new
                          {
                              OD,
                              Value = Encoding.ASCII.GetString((byte[])OD.Value)  // Assuming Value is a column of type object or some other non-string type
                          }).ToList();
            if (result.Count > 0)
                return result.FirstOrDefault().Value;
            else
                return null;
        }

        private List<FolderItemHello> GetParentAndChildrenHello(int? parentId)
        {
            int i = 0;
            var ObjectDetails = (from objDetail in _context.ObjectDetails.Where(obj => obj.ParentObjectId == parentId)
                                 join obj in _context.Objects on objDetail.ParentObjectId equals obj.Id
                                 join objIcon in _context.Icons on objDetail.IconId equals objIcon.Id into iconJoin
                                 from objIcon in iconJoin.DefaultIfEmpty() // Perform left join to handle null IconId
                                 join obj_ref in _context.Objects on objDetail.ReferencedObjectId equals obj_ref.Id into obj_ref_join
                                 from obj_ref in obj_ref_join.DefaultIfEmpty()
                                 select new FolderItemHello
                                 {
                                     key =  Convert.ToString(obj_ref.Id),
                                     label = obj_ref.Name,
                                     data = obj_ref.Name,
                                     icon = objIcon.IconCode ?? "pi-image", // Use default icon if null
                                     ReferencedObjectId = objDetail.ReferencedObjectId,
                                     ParentObjectId= obj.Id
                                 }).ToList();

            var folders = new List<FolderItemHello>();

            foreach (var item in ObjectDetails)
            {
                if (item.data != null)
                {
                    var folder = new FolderItemHello
                    {
                        key = Convert.ToString(i++) + '-' + item.key,
                        label = item.label,
                        data = item.data,
                        icon = "pi pi-fw "+item.icon,
                        ParentObjectId = item.ParentObjectId,
                        children = GetParentAndChildrenHello(item.ReferencedObjectId)
                    };
                    folders.Add(folder);
                }
            }

            return folders;
        }

        private List<MYObjectDetailShort> GetParentAndChildren(int? parentId)
        {
            var ObjectDetails = (from objDetail in _context.ObjectDetails.Where(obj => obj.ParentObjectId == parentId)
                                 join obj in _context.Objects on objDetail.ParentObjectId equals obj.Id
                                 join objIcon in _context.Icons on objDetail.IconId equals objIcon.Id into iconJoin
                                 from objIcon in iconJoin.DefaultIfEmpty() // Perform left join to handle null IconId
                                 join obj_ref in _context.Objects on objDetail.ReferencedObjectId equals obj_ref.Id into obj_ref_join
                                 from obj_ref in obj_ref_join.DefaultIfEmpty()
                                 select new MYObjectDetailShort
                                 {
                                     Id = objDetail.Id,

                                     ParentObjectId = objDetail.ParentObjectId,
                                     ReferencedObjectId = objDetail.ReferencedObjectId,
                                     DataTypeId= objDetail.DataTypeId,
                                     IconCode = objIcon.IconCode ?? "pi-image", // Use default icon if null
                                     ObjectName = obj.Name,
                                     ObjectDetailId = objDetail.Id,
                                     ReferencedObjectName = obj_ref.Name,
                                 }).ToList();

            foreach (var child in ObjectDetails)
            {
                if (child.ReferencedObjectId != null)
                    child.Children = GetParentAndChildren((int?)child.ReferencedObjectId).ToList();
            }
            
            return ObjectDetails;
        }
        private List<MyObjectData> GetParentAndChildrenTreeview(int? nodeId)
        {
            var getActualNodeId = _context.ObjectDetails.FirstOrDefault(a => a.Id == nodeId);
            var ObjectDetails = (from objDetail in _context.ObjectDetails
                              join obj in _context.Objects on objDetail.ParentObjectId equals obj.Id
                              join objIcon in _context.Icons on objDetail.IconId equals objIcon.Id into iconJoin
                              from objIcon in iconJoin.DefaultIfEmpty() // Perform left join to handle null IconId
                              join obj_ref in _context.Objects on objDetail.ReferencedObjectId equals obj_ref.Id into obj_ref_join
                              from obj_ref in obj_ref_join.DefaultIfEmpty()
                              where obj.Id == getActualNodeId.ParentObjectId
                              select new MyObjectData
                              {
                                  ObjectId = obj_ref.Id == null ? 0 : obj_ref.Id,
                                  ObjectDetailId = objDetail.Id,
                                  ObjectName = obj.Name,
                                  ReferencedObjectName = obj_ref.Name,
                                  ParentObjectId = obj.Id,
                                  IconCode = objIcon.IconCode ?? "pi-image", // Use default icon if null
                              }).ToList();

            foreach (var child in ObjectDetails)
            {
                if (child.ReferencedObjectName != null)
                    child.Children = GetParentAndChildrenTreeview((int?)child.ObjectDetailId).ToList();
            }

            return ObjectDetails;
        }
        private List<MYObjectDetail> GetParentAndChildrenById(int? parentId)
        {
            var ObjectDetails = (from objDetail in _context.ObjectDetails
                         join obj in _context.Objects on objDetail.ParentObjectId equals obj.Id
                         join objIcon in _context.Icons on objDetail.IconId equals objIcon.Id into objIconGroup
                         from objIcon in objIconGroup.DefaultIfEmpty()
                         join objDataTypeMaster in _context.DataTypeMasters on objDetail.DataTypeId equals objDataTypeMaster.Id into objDataTypeMasterGroup
                         from objDataTypeMaster in objDataTypeMasterGroup.DefaultIfEmpty()
                         join objLM in _context.LocaleMasters on objDetail.LocaleId equals objLM.Id into objLMGroup
                         from objLM in objLMGroup.DefaultIfEmpty()
                         join objUser in _context.AspNetUsers on objDetail.AspNetUsersId equals objUser.Id
                         join objUserObject in _context.AspNetUsers on obj.AspNetUsersId equals objUserObject.Id
                         join obj_ref in _context.Objects on objDetail.ReferencedObjectId equals obj_ref.Id into objRefGroup
                         from obj_ref in objRefGroup.DefaultIfEmpty()
                         where objDetail.ParentObjectId == parentId
                         select new MYObjectDetail
                         {
                             ObjectId = obj_ref != null ? obj_ref.Id : obj.Id,
                             ReferencedObjectId = objDetail.ReferencedObjectId,
                             ParentObjectId = obj.Id,
                             ObjectDetailId = objDetail.Id,
                             Precision = objDetail.Precision,
                             CustomData=objDetail.CustomData,
                             SortOrder=objDetail.SortOrder,
                             ObjectName = obj.Name,
                             CustomPrefix=obj.CustomPrefix,
                             CustomSuffix=obj.CustomSuffix,
                             ObjectCreatedDate = obj.CreatedAt,
                             ObjectDetailCreatedDate = objDetail.CreatedAt,
                             ReferencedObjectName = obj_ref != null ? obj_ref.Name : null,
                             IconCode = objIcon != null ? objIcon.IconCode : null,
                             IconName = objIcon != null ? objIcon.IconName : null,
                             DataTypeName = objDataTypeMaster != null ? objDataTypeMaster.DataTypeName : null,
                             SQLType = objDataTypeMaster != null ? objDataTypeMaster.Sqltype : null,
                             LocaleName = objLM != null ? objLM.Name : null,
                             ShortCode = objLM != null ? objLM.ShortCode : null,
                             ObjectDetailCreatedByUser = objUser.UserName,
                             ObjectCreatedByUser = objUserObject.UserName
                         }).ToList();

            foreach (var child in ObjectDetails)
            {
                    child.Children = GetParentAndChildrenById((int?)child.ReferencedObjectId).ToList();
            }
            return ObjectDetails;
        }
    }
}
public class MYObjectDetail
{
    public long Id { get; set; }
    public int ParentObjectId { get; set; }
    public int? ReferencedObjectId { get; set; }
    public List<MYObjectDetail> Children { get; set; }
    public int ObjectId { get; internal set; }
    public long ObjectDetailId { get; internal set; }
    public string? Precision { get; internal set; }
    public string? CustomData { get; internal set; }
    public int SortOrder { get; internal set; }
    public string ObjectName { get; internal set; }
    public string? CustomPrefix { get; internal set; }
    public string? CustomSuffix { get; internal set; }
    public DateTime ObjectCreatedDate { get; internal set; }
    public DateTime ObjectDetailCreatedDate { get; internal set; }
    public string? ReferencedObjectName { get; internal set; }
    public string? IconCode { get; internal set; }
    public string? IconName { get; internal set; }
    public string? DataTypeName { get; internal set; }
    public string? SQLType { get; internal set; }
    public string? LocaleName { get; internal set; }
    public string? ShortCode { get; internal set; }
    public string? ObjectDetailCreatedByUser { get; internal set; }
    public string? ObjectCreatedByUser { get; internal set; }
    public string Value { get; internal set; }
}

public class MYObjectDetailShort
{
    public long Id { get; set; }
    public int ParentObjectId { get; set; }
    public int? ReferencedObjectId { get; set; }
    public int? DataTypeId { get; set; }
    public int ObjectId { get; internal set; }
    public string ObjectName { get; internal set; }
    public string? ReferencedObjectName { get; internal set; }
    public string? IconCode { get; internal set; }
    public long ObjectDetailId { get; internal set; }
    public List<MYObjectDetailShort> Children { get; set; }
    
}

public class MyObjectData
{
    public int ObjectId { get; internal set; }
    public long ObjectDetailId { get; internal set; }
    public string ObjectName { get; internal set; }
    public string? ReferencedObjectName { get; internal set; }
    public int ParentObjectId { get; set; }
    public string? IconCode { get; internal set; }
    public List<MyObjectData> Children { get; set; }
}