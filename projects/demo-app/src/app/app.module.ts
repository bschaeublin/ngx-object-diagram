import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxObjectDiagramModule } from 'projects/ngx-object-diagram/src/public-api';

import { AppComponent } from './app.component';
import { BasicUsageComponent } from './components/basic-usage/basic-usage.component';
import { AssocUsageComponent } from './components/assoc-usage/assoc-usage.component';

@NgModule({
  declarations: [AppComponent, BasicUsageComponent, AssocUsageComponent],
  imports: [BrowserModule, NgxObjectDiagramModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
