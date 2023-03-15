import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { NgxObjectDiagramEntityField } from "../../model/ngx-object-diagram-entity-field";
import { select, Store } from "@ngrx/store";
import { AppState } from "../../state/app.state";
import { selectEntities, selectGraphFeatureState } from "../../state/graph.reducer";
import { Entity } from "../../model/entity";
import { setCurrentGraphId, setEntities } from "../../state/graph.actions";
import { skip } from "rxjs";

@Component({
  selector: "ngx-object-diagram",
  templateUrl: "ngx-object-diagram.component.html",
  styleUrls: ["ngx-object-diagram.component.scss"],
})
export class NgxObjectDiagramComponent implements OnInit,OnChanges {
  @Input()
  public typeNameProp: string = "typeName";

  @Input()
  public displayName: string = "displayName";

  @Input()
  public trackFields: (
    obj: Record<string, unknown>
  ) => NgxObjectDiagramEntityField[] = (obj) => {
    return Object.keys(obj)
      .filter((key) => key !== this.typeNameProp && key !== this.displayName)
      .map((key) => {
        return {
          fieldName: key,
          fieldKey: key,
          isAssoc: obj[key] instanceof Array<Record<string, unknown>>
        }
      });
  };

  @Input()
  public trackAssocs: (
    obj: Record<string, unknown>
  ) => Record<string, unknown>[] = (obj) => {
    return Object.keys(obj)
      .filter((key) => obj[key] instanceof Array<Record<string, unknown>>)
      .flatMap((key) => {
        return obj[key] as Record<string, unknown>[];
      });
  };

  @Input()
  public objs: Record<string, unknown>[] = [];

  public entities: Entity[] = [];

  private readonly graphId: string;

  constructor(private store: Store<AppState>) {
    this.graphId = crypto.randomUUID();
  }

  ngOnChanges(): void {
    console.log("changes");
    this.store.dispatch(setEntities({ objs: this.objs, graphId: this.graphId }));
  }

  ngOnInit(): void {
    this.store.dispatch(setCurrentGraphId({ graphId: this.graphId }));
    console.log("ngOnInit");
    this.store.pipe(select(selectEntities), skip(0)).subscribe(
      entities => this.entities = entities
    );
  }
}
