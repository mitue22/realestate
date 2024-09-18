import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-builder-modal',
  templateUrl: './builder-modal.component.html',
  styleUrls: ['./builder-modal.component.scss']
})
export class BuilderModalComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit() {
    
  }

  

}
