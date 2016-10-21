import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import { FormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    FileDropDirective,
    FileSelectDirective
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }