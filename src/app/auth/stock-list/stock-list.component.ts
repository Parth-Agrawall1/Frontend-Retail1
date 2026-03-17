import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StockService } from '../../services/Stock.Service ';

@Component({
  standalone: true,
  selector: 'app-stock-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.css',
})
export class StockListComponent implements OnInit {
  stocks: any[] = [];

  constructor(
    private stockService: StockService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadStocks();
    this.cd.detectChanges();
  }

  loadStocks(): void {
    this.stockService.getStock().subscribe({
      next: (res: any[]) => {
        this.stocks = res;
        this.cd.detectChanges();
      },
      error: (err) => console.error('Stock load failed', err),
    });
  }

  savePrice(stock: any): void {
    if (!stock.newSalePrice) {
      alert('Enter sale price');
      return;
    }

    this.stockService.updateSalePrice(stock.id, stock.newSalePrice).subscribe({
      next: () => {
        alert('Sale price updated');
        stock.newSalePrice = null;
        this.loadStocks();
      },
      error: (err) => alert(err?.error ?? 'Update failed'),
    });
  }
}
