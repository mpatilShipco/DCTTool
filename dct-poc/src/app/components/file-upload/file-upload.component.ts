import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../shared/auth.service';
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

	//fileUploadForm: FormGroup;
    uploadForm: FormGroup;  

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    private actRoute: ActivatedRoute
  ) {
  		//this.currentURL = 'UPD SACO-CL_FOB_Excel.xlsx';
  		//this.currentURL = this.router.url; 


  	/*this.fileUploadForm = this.fb.group({
      uploadfile: ['']
    })*/

    this.uploadForm = this.fb.group({
      uploadfile: ['']
    })

   }

   onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('uploadfile').setValue(file);
    }
  }

  ngOnInit() {
  }

  fileUpload() {
    /*const formData = new FormData();
    formData.append("fieldname", 'uploadfile');
    formData.append("filename", this.fileUploadForm.get('uploadfile').value);
    formData.append('originalname', this.fileUploadForm.get('uploadfile').value);
    formData.append('encoding', '7bit')
    formData.append('file', this.fileUploadForm.get('uploadfile').value);
    console.log("formData");
    console.log(formData);
    return false;
    this.authService.fileUpload(formData);*/

    const formData = new FormData();    
    formData.append('uploadfile', this.uploadForm.get('uploadfile').value);

    console.log('formData - fileUpload');
    console.log(formData);
    console.log(this.uploadForm.get('uploadfile').value);

    return this.authService.fileUpload(formData);   

  }


  downloadFile(filename = ''){
        let link = document.createElement("a");
        link.download = "samplefile";
        link.href = "assets/UPD SACO-CL_FOB_Excel.xlsx";
        link.click();
	}

}
