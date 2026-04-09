import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PurchaseRequestService } from '../../services/purchase-request.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-pr-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './pr-list.component.html',
  styleUrl: './pr-list.component.css',
})
export class PrListComponent implements OnInit {
  prs: any[] = [];
  statusFilter: string = '';
  userRole: string = '';

  constructor(
    private prService: PurchaseRequestService,
    private authService: AuthService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.userRole = this.authService.getRole() ?? '';
    this.cd.detectChanges();
    console.log('role', this.userRole);
    this.loadPRs();
  }

  loadPRs() {
    this.prService.getPRs().subscribe({
      next: (data: any[]) => {
        this.prs = this.statusFilter
          ? data.filter((pr) => pr.status?.toLowerCase() === this.statusFilter.toLowerCase())
          : data;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load PRs', err);
        alert('Failed to load PR list');
      },
    });
  }

  getBadgeClass(status: string) {
    switch ((status || '').toLowerCase()) {
      case 'draft':
        return 'bg-secondary';
      case 'submitted':
        return 'bg-secondary';
      case 'approved':
        return 'bg-success';
      case 'rejected':
        return 'bg-danger';
      case 'paid':
        return 'bg-info';
      default:
        return 'bg-light text-dark';
    }
  }
  //  <!-- Seller actions -->
  submitPR(id: number) {
    if (!confirm('Submit this PR?')) return;

    this.prService.submitPR(id).subscribe({
      next: () => {
        alert('PR submitted!');
        this.loadPRs();
      },
      error: (err) => {
        console.error('Submit failed', err);
        alert('Submit failed: ' + (err?.error?.title ?? err?.message ?? 'Unknown'));
      },
    });
  }

  deletePR(id: number) {
    if (!confirm('Delete this PR?')) return;

    this.prService.deletePR(id).subscribe({
      next: () => {
        alert('PR deleted!');
        this.loadPRs();
      },
      error: (err) => {
        console.error('Delete failed', err);
        alert('Delete failed: ' + (err?.error?.title ?? err?.message ?? 'Unknown'));
      },
    });
  }

  //  <!-- Manager actions -->
  approvePR(id: number) {
    const comment = prompt('Approval comment:') ?? '';
    this.prService.approvePR(id, comment).subscribe({
      next: () => {
        alert('PR approved!');
        this.loadPRs();
      },
      error: (err) => {
        console.error('Approve failed', err);
        alert('Approve failed');
      },
    });
  }

  rejectPR(id: number) {
    const comment = prompt('Rejection comment:') ?? '';
    this.prService.rejectPR(id, comment).subscribe({
      next: () => {
        alert('PR rejected!');
        this.loadPRs();
      },
      error: (err) => {
        console.error('Reject failed', err);
        alert('Reject failed');
      },
    });
  }

  //  <!-- Finance actions -->
  markPaid(id: number) {
    if (!confirm('Mark PR as PAID?')) return;

    this.prService.markAsPaid(id).subscribe({
      next: (res) => {
        console.log('mark-paid success', res);
        alert(res?.message || 'PR marked as PAID!');
        this.loadPRs();
      },
      error: (err) => {
        console.error('Mark paid failed (error handler)', err);
        alert('Mark as paid failed: ' + (err?.error ?? err?.message ?? 'Unknown'));
      },
    });
  }
}
