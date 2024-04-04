import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { TreeNode } from 'primeng/api/treenode';
import { ITreeViewNode } from './treenode.interface';
@Injectable({
  providedIn: "root"
})

export class NodeService {
  private baseURL = environment.BASE_URL;
  constructor(private http: HttpClient) {
  }
  getNodeTreeFiles(): Observable<TreeNode[]> {
    return this.http.get<TreeNode[]>(`${this.baseURL}/api/PIMTree/getpimtreeview`);
  }

  getTreeViewNode(): Observable<ITreeViewNode[]> {
    return this.http.get<ITreeViewNode[]>(`${this.baseURL}/api/PIMTree/gettreeviewnode`);
  }
  getTreeViewByNodeId(nodeId: number): Observable<TreeNode[]> {
    return this.http.get<TreeNode[]>(`${this.baseURL}/api/PIMTree/GetTreeViewByNodeId/?nodeId=${nodeId}`);
  }
  getValueFromObjectData(objId: number, refId: number): Observable<string> {
    return this.http.get<string>(`${this.baseURL}/api/PIMTree/GetValueFromObjectData/?objId=${objId}&refId=${refId}`);
  }
  getObjectById(objId: number): Observable<string> {
    return this.http.get<string>(`${this.baseURL}/api/PIMTree/GetObjectById/?objId=${objId}`);
  }

  GetObjectDetailsByObjId(objId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/api/PIMTree/GetObjectDetailsByObjId/?objId=${objId}`);
  }
}