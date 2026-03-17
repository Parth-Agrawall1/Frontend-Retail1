import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StockService {

  private api = 'http://localhost:5195/api/Stock';

  constructor(private http: HttpClient) {}

  private authHeader() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  getStock() {
    return this.http.get<any[]>(this.api, this.authHeader());
  }

  updateSalePrice(id: number, salePrice: number) {
    return this.http.put(
      `${this.api}/${id}/sale-price`,
       { salePrice },
      this.authHeader()
    );
  }
}
