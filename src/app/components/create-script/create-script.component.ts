import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'create-script-component',
  templateUrl: './create-script.component.html',
  styleUrls: ['./create-script.component.css']
})
export class CreateScriptComponent {
  formScript: FormGroup;
  filename: string = 'testo'; // Nome del file di default

  constructor(private fb: FormBuilder) {
    this.formScript = this.fb.group({
      COD_SOCRIFERIMENTO: ['', Validators.required],
      COD_LING_USER: ['', Validators.required],
      COD_TEMPLATE: ['', Validators.required],
      DES_TEMPLATE: ['', Validators.required],
      HTML_TEMPLATE: ['', Validators.required],
      DES_FILE: ['', Validators.required],
      operation: ['insert', Validators.required]
    });
  }

  onSubmit() {
    if (this.formScript.valid) {
      const formValues = this.formScript.value;
      let sqlQuery = '';
  
      if (formValues.operation === 'insert') {
        sqlQuery = `INSERT INTO GDET_TEMPLATE (COD_SOCRIFERIMENTO, COD_LING_USER, COD_TEMPLATE, DES_TEMPLATE, HTML_TEMPLATE, DES_FILE) VALUES ('${formValues.COD_SOCRIFERIMENTO}', '${formValues.COD_LING_USER}', '${formValues.COD_TEMPLATE}', '${formValues.DES_TEMPLATE}', '${formValues.HTML_TEMPLATE}', '${formValues.DES_FILE}');`;
      } else if (formValues.operation === 'update') {
        sqlQuery = `UPDATE GDET_TEMPLATE SET COD_LING_USER='${formValues.COD_LING_USER}', COD_TEMPLATE='${formValues.COD_TEMPLATE}', DES_TEMPLATE='${formValues.DES_TEMPLATE}', HTML_TEMPLATE='${formValues.HTML_TEMPLATE}', DES_FILE='${formValues.DES_FILE}' WHERE COD_SOCRIFERIMENTO='${formValues.COD_SOCRIFERIMENTO}';`;
      }
  
      this.downloadTxtFile(sqlQuery);
    }
  }

  downloadTxtFile(content: string) {
    const fileName = this.filename.trim() ? `${this.filename}.txt` : 'insert.txt';
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  }

}
