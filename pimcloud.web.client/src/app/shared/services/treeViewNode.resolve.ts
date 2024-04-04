import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { NodeService } from "src/app/tree/view/nodeservice";
@Injectable({
  providedIn: "root"
})

export class TreeViewNodeDataResolve {
  constructor(private nodeService: NodeService) {
  }

  resolve(): Observable<any> {
    return this.nodeService.getTreeViewNode();
  }
}
