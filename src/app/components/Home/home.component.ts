import { Component } from '@angular/core';

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  title = 'Project_Utility';

  inputText: string = '';
  textBlocks: string[] = [];
  filename: string = 'testo'; // Nome del file di default

  ngOnInit(): void {
    
  }

  splitText() {
    const maxLength = 20000;
    const textLength = this.inputText.length;
    let start = 0;
    let end = maxLength;

    this.textBlocks = [];

    while (start < textLength) {
      const textBlock = this.inputText.slice(start, end);
      this.textBlocks.push(textBlock);

      start = end;
      end = start + maxLength;
    }
  }

  downloadFile() {
    // Se il nome del file non è stato specificato, usiamo "testo.txt" come default
    const fileName = this.filename.trim() ? `${this.filename}.txt` : 'testo.txt';
    
    // Creiamo il contenuto del file con i segmenti numerati
    let fileContent = '';
    this.textBlocks.forEach((block, index) => {
        // Sostituiamo gli apostrofi con doppi apici
        let sanitizedBlock = block.replace(/'/g, '"');

        // Aggiungiamo "----------------" dopo il numero del segmento
        fileContent += `--Segmento ${index + 1} -------------------- \n${sanitizedBlock}\n\n`;
    });

    const blob = new Blob([fileContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  }

}
