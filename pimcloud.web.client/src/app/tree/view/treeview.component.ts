import { Component, OnInit } from "@angular/core";
import { SharedModule } from "primeng/api";
import { TreeNode } from 'primeng/api';
import { NodeService } from "./nodeservice";
import { TreeModule } from 'primeng/tree';
import { SplitterModule } from 'primeng/splitter';
import { ActivatedRoute } from "@angular/router";
import { takeUntil } from 'rxjs/operators';
import { Subject } from "rxjs";
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { NgIf, DatePipe, NgFor } from "@angular/common";
import { AccordionModule } from 'primeng/accordion';
import { ObjectDetail } from './treenode.interface';
import { ObjectDetailsComponent } from "./object-details/object-details.component";
import { ProgressSpinnerModule } from 'primeng/progressspinner';
@Component({
    templateUrl: "./treeview.component.html",
    standalone: true,
    providers: [NodeService],
    imports: [ObjectDetailsComponent,ProgressSpinnerModule, SharedModule, TreeModule, SplitterModule, PanelModule, TabViewModule, NgIf, NgFor, DatePipe, AccordionModule]
})
export class TreeViewComponent implements OnInit {
    files!: TreeNode[];
    nodeId: number = 0;
    selectedFile!: any;
    objectDataValue: any = "";
    objectInfo: any;
    isParentView: boolean = false;
    objectParentDetails: any;
    objectReferenceDetails: any;
    objectDetails: ObjectDetail[] = [];
    private destroy$: Subject<void> = new Subject<void>();
    constructor(private nodeService: NodeService, private route: ActivatedRoute) {
    }
    ngOnInit() {
        this.route.params.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.objectDataValue = "";
            const urlSegments = this.route.snapshot.url;
            // Get the last segment
            if (urlSegments.length > 0) {
                this.nodeId = Number(urlSegments[urlSegments.length - 1].path);
            }
            this.nodeService.getTreeViewByNodeId(this.nodeId).subscribe((data) => {
                this.files = data;
            })
        })
    }
    expandAll() {
        this.files.forEach((node) => {
            this.expandRecursive(node, true);
        });
    }

    collapseAll() {
        this.files.forEach((node) => {
            this.expandRecursive(node, false);
        });
    
    }

    private expandRecursive(node: TreeNode, isExpand: boolean) {
        node.expanded = isExpand;
        if (node.children) {
            node.children.forEach((childNode) => {
                this.expandRecursive(childNode, isExpand);
            });
        }
    }
    nodeSelect(evt: any): void {
        this.objectDetails=[];
        this.objectDataValue = "";
        const objId = evt.node.key.split('-')[1];
        if (evt.node.children.length == 0) {
            this.isParentView = false;
            const refId = evt.node.parent.parent.key.split('-')[2]
            this.nodeService.getValueFromObjectData(objId, refId).subscribe((data) => {
                this.objectDataValue = data;
            })
        } else {
            this.isParentView = true;
            this.nodeService.getObjectById(objId).subscribe((data) => {
                this.objectInfo = data;
            });
            this.nodeService.GetObjectDetailsByObjId(objId).subscribe((result: any[]) => {
                if(result.length>0){
                    result[0].Value= evt.node.label;
                this.objectDetails = result;
                }
            });
        }
    }
}
