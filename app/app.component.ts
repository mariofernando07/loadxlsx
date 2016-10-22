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
    /* set up XMLHttpRequest */
    let url = "MEDICAMENTOS_ALLNEXUS.xlsx";
    let oReq = new XMLHttpRequest();
    oReq.open("GET", url, true);
    oReq.responseType = "arraybuffer";
    oReq.onload = function (e: any) {
      let arraybuffer = oReq.response;
      console.log(arraybuffer);
      /* convert data to binary string */
      let data = new Uint8Array(arraybuffer);
      let arr = new Array();
      for (let i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      let bstr = arr.join("");

      /* Call XLSX */
      let workbook = XLSX.read(bstr, { type: "binary" });
      /* DO SOMETHING WITH workbook HERE */
      let first_sheet_name = workbook.SheetNames[0];
      /* Get worksheet */
      let worksheet = workbook.Sheets[first_sheet_name];
      console.log(XLSX.utils.sheet_to_json(worksheet));
    }

    oReq.send();
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
      let data = e.target.result;
      let workbook = XLSX.read(data, { type: 'binary' });
      // let wb = XLSX.parse_xlscfb(cfb);
      let first_sheet_name = workbook.SheetNames[0];
      let worksheet = workbook.Sheets[first_sheet_name];
      console.log(XLSX.utils.sheet_to_json(worksheet));
    };

    reader.onerror = function (ex) {
      console.log(ex);
    };

    reader.readAsBinaryString(this.file);
  }

}