export interface FileItem {
  key: string;
  label: string;
  data: string;
  icon: string;
}

export interface IFolderItemResponse extends FileItem {
  children: FileItem[];
}

export interface ITreeViewNode {
  Id: number;
  ObjectId: number;
  Name: string;
  SortOrder: number;
}
export interface ITreeViewNodeNew {
  Name: string;
  Details: TreeViewNodeDetail[];
}

interface TreeViewNodeDetail {
  Id: number;
  ObjectId: number;
  ParentTreeViewNodeId: number;
  Name: string;
  ObjectDetailId: number;
}
export interface ObjectDetail {
  Id: number;
    ParentObjectId: number;
    ReferencedObjectId: number | null;
    Children?: ObjectDetail[];
    ObjectId: number;
    ObjectDetailId: number;
    Precision?: string | null;
    CustomData?: string | null;
    SortOrder: number;
    ObjectName: string;
    CustomPrefix?: string | null;
    CustomSuffix?: string | null;
    ObjectCreatedDate: Date;
    ObjectDetailCreatedDate: Date;
    ReferencedObjectName?: string | null;
    IconCode?: string | null;
    IconName?: string | null;
    DataTypeName?: string | null;
    SQLType?: string | null;
    LocaleName?: string | null;
    ShortCode?: string | null;
    ObjectDetailCreatedByUser?: string | null;
    ObjectCreatedByUser?: string | null;
    Value?: string | null;
}