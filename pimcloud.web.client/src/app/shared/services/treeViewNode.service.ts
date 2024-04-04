import { Injectable, signal, WritableSignal } from "@angular/core";
import { ITreeViewNodeNew } from "src/app/tree/view/treenode.interface";

Injectable();

export class TreeViewNodeService {
  private treeViewNodeInfo: WritableSignal<ITreeViewNodeNew[] | []>;
  constructor() {
    this.treeViewNodeInfo = signal([]);
  }
  get treeViewNodeDetail(): ITreeViewNodeNew[] | [] {
    return this.treeViewNodeInfo();
  }
  public createTreeViewNode(treeViewNode: ITreeViewNodeNew[]): void {
    this.treeViewNodeInfo.set(treeViewNode);
  }
}