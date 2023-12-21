import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GridModule, PagerModule } from '@syncfusion/ej2-angular-grids';
import { PageService, FilterService, SortService } from '@syncfusion/ej2-angular-grids';
import { DiagramModule } from '@syncfusion/ej2-angular-diagrams';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
 
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GridModule, PagerModule, DiagramModule, ToolbarModule 
  ],
  providers: [PageService,
    SortService,
    FilterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
