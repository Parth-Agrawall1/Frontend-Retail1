import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PurchaseRequestService } from '../../services/purchase-request.service';

@Component({
  selector: 'app-pr-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pr-create.component.html',
  styleUrl: './pr-create.component.css',
})
export class PrCreateComponent {
  pr = {
    title: '',
    description: '',
    amount: 0,
    items: [
      { itemName: '', hsnNumber: '', itemCode: '', quantity: 1, costPrice: 0, Mrp: 0, total: 0 },
    ],
  };

  constructor(
    private prService: PurchaseRequestService,
    private router: Router,
  ) {}

  addItem() {
    this.pr.items.push({
      itemName: '',
      hsnNumber: '',
      itemCode: '',
      quantity: 1,
      costPrice: 0,
      Mrp: 0,
      total: 0,
    });
    this.updateTotals();
  }

  removeItem(i: number) {
    this.pr.items.splice(i, 1);
    this.updateTotals();
  }

  updateTotals() {
    this.pr.items.forEach((item) => (item.total = item.quantity * item.costPrice));
    this.pr.amount = this.pr.items.reduce((sum, item) => sum + item.total, 0);
  }

  submitPR() {
    if (!this.pr.title.trim()) {
      alert('Title required');
      return;
    }

    const payload = {
      title: this.pr.title,
      description: this.pr.description,
      amount: this.pr.amount,
      items: this.pr.items.map((i) => ({
        itemName: i.itemName,
        hsnNumber: i.hsnNumber,
        itemCode: i.itemCode,
        quantity: i.quantity,
        costPrice: i.costPrice,
        Mrp: i.Mrp,
        total: i.total,
      })),
    };

    this.prService.createPR(payload).subscribe({
      next: () => {
        alert('PR Created Successfully!');
        this.router.navigate(['/PurchaseRequest']);
      },
      error: (err) => {
        console.error('Create PR Error:', err);
        alert('Failed: ' + err.error?.message || 'Server error');
      },
    });
  }
}
