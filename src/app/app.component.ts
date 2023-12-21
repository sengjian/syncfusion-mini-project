import { Component, ViewChild } from '@angular/core';
import { DiagramComponent } from '@syncfusion/ej2-angular-diagrams';
import { DataManager } from '@syncfusion/ej2-data';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import {
  Diagram, NodeModel, DiagramTools, BasicShapeModel, SnapSettingsModel,
  NodeConstraints, DataBinding, RadialTree, SnapConstraints, ZoomOptions
} from '@syncfusion/ej2-diagrams';

export interface DataInfo {
  [key: string]: string;
}
Diagram.Inject(DataBinding, RadialTree);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('diagram')
    public diagram!: DiagramComponent;
    public tool: DiagramTools = DiagramTools.ZoomPan;
    public data: Object = {
        //sets the fields to bind
        id: 'Id', parentId: 'ParentId',
        dataSource: new DataManager([
            {
                "Id": "parent", "Name": "Project 1", "Element": "Project"
            },
            {
                "Id": 1, "Name": "Epic 1",
                "ParentId": "parent", "Element": "Epic"
            },
            {
                "Id": 2, "Name": "Epic 2",
                "ParentId": "parent", "Element": "Epic"
            },
            {
                "Id": 3, "Name": "Epic 3",
                "ParentId": "parent", "Element": "Epic"
            },
            {
                "Id": 5, "Name": "Feature 1",
                "ParentId": 1
            },
            {
                "Id": 6, "Name": "Feature 2",
                "ParentId": 1
            },
            {
                "Id": 7, "Name": "Feature 3",
                "ParentId": 2
            },
            {
                "Id": 8, "Name": "Feature 4",
                "ParentId": 2
            },
            {
                "Id": 9, "Name": "Feature 5",
                "ParentId": 3
            },
            {
                "Id": 10, "Name": "Feature 6",
                "ParentId": 3
            },
            {
                "Id": 11, "Name": "Story 1",
                "ParentId": 5
            },
            {
                "Id": 12, "Name": "Story 2",
                "ParentId": 5
            },
            {
                "Id": 13, "Name": "Story 3",
                "ParentId": 5
            },
            {
                "Id": 14, "Name": "Story 4",
                "ParentId": 6
            },
            {
                "Id": 15, "Name": "Story 5",
                "ParentId": 6
            },
            {
                "Id": 16, "Name": "Story 6",
                "ParentId": 6
            },
            {
                "Id": 17, "Name": "Story 7",
                "ParentId": 7
            },
            {
                "Id": 18, "Name": "Story 8",
                "ParentId": 7
            },
            {
                "Id": 19, "Name": "Story 9",
                "ParentId": 7
            },
            {
                "Id": 20, "Name": "Story 10",
                "ParentId": 8
            },
            {
                "Id": 21, "Name": "Story 11",
                "ParentId": 8
            },
            {
                "Id": 22, "Name": "Story 12",
                "ParentId": 8
            },
            {
                "Id": 23, "Name": "Story 10",
                "ParentId": 9
            },
            {
                "Id": 24, "Name": "Story 11",
                "ParentId": 9
            },
            {
                "Id": 25, "Name": "Story 12",
                "ParentId": 9
            },
            {
                "Id": 26, "Name": "Story 13",
                "ParentId": 10
            },
            {
                "Id": 27, "Name": "Story 14",
                "ParentId": 10
            },
            {
                "Id": 28, "Name": "Story 15",
                "ParentId": 10
            },
      ]),
        //binds the data with the nodes
        doBinding: (nodeModel: NodeModel, data: DataInfo, diagram: Diagram) => {
            nodeModel.annotations = [{
                content: data['Name'],
                style: data['Id'] === 'parent' ? { color: 'white', fontSize: 50 } : { color: 'black', fontSize: 20 }
            }];
            nodeModel.constraints = NodeConstraints.Default & ~NodeConstraints.InheritTooltip | NodeConstraints.Tooltip;
            nodeModel.tooltip = {
                content: data['Name']
                //  + '<br/>' + data['Designation']
                 , 
                relativeMode: 'Object',
                position: 'TopCenter', showTipPointer: true,
            };
            if (data['Element'] === 'Project') {
                nodeModel.width = 400;
                nodeModel.height = 400;
                nodeModel.shape = { shape: 'Ellipse' } as BasicShapeModel;
                nodeModel.style = { fill: 'black' };
            } 
            else if (data['Element'] === 'Epic') {
                nodeModel.width = 130;
                nodeModel.height = 130;
                nodeModel.height = 130;
                nodeModel.style = { fill: '#f8ab52' };
            } 
            else {
                nodeModel.width = 100;
                nodeModel.height = 100;
                nodeModel.shape = { shape: 'Ellipse' } as BasicShapeModel;
                nodeModel.style = { fill: '#afeeee' };
            }
        }
    };
    public layout: Object = {
        type: 'RadialTree', verticalSpacing: 30, horizontalSpacing: 20,
        root: 'Category'
    };

    public create(args: Object): void {
        this.diagram.fitToPage();
        this.diagram.dataBind();
    }

    public snapSettings: SnapSettingsModel = { constraints: SnapConstraints.None };
    public onItemClick(args: ClickEventArgs): void {
        switch (args.item.text) {
            case 'Zoom In':
                let zoomin: ZoomOptions = { type: 'ZoomIn', zoomFactor: 0.2 };
                this.diagram.zoomTo(zoomin);
                this.diagram.dataBind();
                break;
            case 'Zoom Out':
                let zoomout: ZoomOptions = { type: 'ZoomOut', zoomFactor: 0.2 };
                this.diagram.zoomTo(zoomout);
                this.diagram.dataBind();
                break;
            case 'Reset':
                this.diagram.reset();
                this.diagram.fitToPage();
                break;
        }
    }
}
