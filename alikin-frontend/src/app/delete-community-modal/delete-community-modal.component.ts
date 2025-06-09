import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-delete-community-modal',
  templateUrl: './delete-community-modal.component.html',
  styleUrls: ['./delete-community-modal.component.scss']
})
export class DeleteCommunityModalComponent implements OnInit {
  @Input() communityName: string = '';
  @Output() close = new EventEmitter<void>();
  @Output() confirmDelete = new EventEmitter<string>();

  confirmForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.confirmForm = this.fb.group({
      confirmationName: ['', [Validators.required, Validators.pattern(this.escapeRegExp(this.communityName))]]
    });
  }

  private escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  get confirmationName() {
    return this.confirmForm.get('confirmationName');
  }

  onConfirm(): void {
    if (this.confirmForm.valid) {
      this.confirmDelete.emit(this.confirmationName?.value);
    } else {
      this.confirmationName?.markAsTouched();
    }
  }

  onClose(): void {
    this.close.emit();
  }
}
