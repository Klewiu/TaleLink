import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent {
  constructor(public activeModal: NgbActiveModal) {}

  confirmDelete() {
    this.activeModal.close('delete');
  }

  cancelDelete() {
    this.activeModal.dismiss('cancel');
  }
}