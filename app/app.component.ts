import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
declare var XLSX: any;

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({ url: URL });
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  private file: File;
  ngOnInit() {

  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  readFile() {
    console.log(this.file);
    let workbook = XLSX.readFile(this.file);
    console.log(workbook);
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    this.file = inputValue.files[0];
    console.log(this.file);
    let reader: FileReader = new FileReader();

    reader.onload = function (e: any) {
      console.log(e);
      let data = e.target.result();
      let cfb = XLSX.read(data, { type: 'binary' });
      let wb = XLSX.parse_xlscfb(cfb);
      wb.SheetNames.forEach(function (sheetName) {
        // Here is your object
        var XL_row_object = XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
        var json_object = JSON.stringify(XL_row_object);
        console.log(json_object);

      })

    };

    reader.onerror = function (ex) {
      console.log(ex);
    };

    reader.readAsBinaryString(this.file);
  }

}