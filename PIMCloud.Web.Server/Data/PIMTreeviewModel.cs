namespace PIMCloud.Web.Server.Data
{
    public class PIMTreeviewModel
    {

    }
    public class FileItem
    {
        public string key { get; set; }
        public string label { get; set; }
        public string data { get; set; }
        public string icon { get; set; }
    }

    public class FolderItem : FileItem
    {
        public List<FileItem> children { get; set; }
    }
    public class TreeViewNode<T>
    {
        public string Name { get; set; }
        public List<T> Details { get; set; }
    }



    public class FolderItemHello 
    {
        public string key { get; set; }
        public string label { get; set; }
        public string data { get; set; }
        public string icon { get; set; }
        public int? ReferencedObjectId { get; set; }
        public int? ParentObjectId { get; set; }
        
        public List<FolderItemHello> children { get; set; }
    }
}
