import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsService } from '../../services/reports.service';
import { forkJoin } from 'rxjs';

interface StockSummary {
  itemName: string;
  hsnNumber: string;
  totalQuantity: number;
  totalCostValue: number;
  batchCount: number;
}

interface StockBatch {
  id: number;
  itemName: string;
  itemCode: string;
  hsnNumber: string;
  batch: string;
  quantity: number;
  mrp: number;
  costPrice: number;
  salePrice: number;
  stockValue: number;
  createdFromPrItemId: number;
  createdAt: string;
  arrivedDate: string;
}

interface PrReport {
  prId: number;
  title: string;
  amount: number;
  status: string;
  raisedAt: string;
  approvedAt: string | null;
  paidAt: string | null;
  itemCount: number;
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent {
  prReport: PrReport[] = [];
  stockSummary: StockSummary[] = [];
  stockBatches: StockBatch[] = [];
  allBatches: StockBatch[] = [];

  loadingPR = false;
  loadingStock = false;

  selectedKey: string | null = null;

  constructor(
    private reportsService: ReportsService,
    private cdr: ChangeDetectorRef,
  ) {}

  loadPRReport(): void {
    this.resetStockData();
    this.loadingPR = true;

    this.reportsService.getPrLifecycle().subscribe({
      next: (res) => {
        this.prReport = res ?? [];
        this.loadingPR = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('PR load error:', err);
        this.loadingPR = false;
        this.cdr.detectChanges();
      },
    });
  }

  loadStockReport(): void {
    this.resetPRData();
    this.loadingStock = true;

    forkJoin({
      summary: this.reportsService.getStockSummary(),
      batches: this.reportsService.getStockBatchWise(),
    }).subscribe({
      next: ({ summary, batches }) => {
        this.stockSummary = summary ?? [];
        this.allBatches = batches ?? [];
        this.loadingStock = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Stock load error:', err);
        this.loadingStock = false;
        this.cdr.detectChanges();
      },
    });
  }

  toggleBatchDetails(s: StockSummary): void {
    const key = s.itemName + '_' + s.hsnNumber;

    // If clicking same item → close it
    if (this.selectedKey === key) {
      this.selectedKey = null;
      this.stockBatches = [];
      return;
    }

    // Otherwise open new item
    this.selectedKey = key;

    this.stockBatches = this.allBatches.filter(
      (x) => x.itemName === s.itemName && x.hsnNumber === s.hsnNumber,
    );
  }

  private resetPRData(): void {
    this.prReport = [];
    this.loadingPR = false;
  }

  private resetStockData(): void {
    this.stockSummary = [];
    this.stockBatches = [];
    this.allBatches = [];
    this.loadingStock = false;
  }
}
