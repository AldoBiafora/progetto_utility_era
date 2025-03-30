import { Component } from '@angular/core';

@Component({
  selector: 'split-string-component',
  templateUrl: './split-string.component.html',
  styleUrls: ['./split-string.component.scss']
})
export class SplitStringComponent {
  title = 'Project_Utility';

  inputText: string = '';
  textBlocks: string[] = [];
  filename: string = 'output';
  boxes: string[] = [];

  ngOnInit(): void {
    
  }

  splitText() {
    if (!this.inputText.trim()) return;

    // Dividi il testo in righe
    const lines = this.inputText.split('\n');
    this.boxes = lines.filter(line => line.trim());
  }

  downloadTxtFile() {
    if (this.boxes.length === 0) return;

    const content = this.boxes.join('\n');
    const fileName = this.filename.trim() ? `${this.filename}.txt` : 'output.txt';
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
