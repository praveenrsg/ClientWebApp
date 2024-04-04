using PIMCloud.Web.Server.Data;

namespace PIMCloud.Web.Server.Services.PIMTreeService
{
    public interface IPIMTreeService
    {
        List<FolderItem> GetPIMTreeView();
        List<FolderItem> GetPIMTreeViewSample();
        List<TreeViewNode<TreeViewNodeDetail>> GetTreeViewNodeList();
        List<FolderItemHello> GetTreeViewByNodeId(int nodeId);
        string GetValueFromObjectData(int objId, int refId);
        object GetObjectById(int objId);
        List<MYObjectDetail> GetObjectDetailsByObjId(int objId);
    }
}
