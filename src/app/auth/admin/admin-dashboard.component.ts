import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = null;
  newRole: string = '';

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.adminService.getUsers().subscribe((res) => {
      this.users = res;
      this.cdr.detectChanges();
    });
  }

  loadUsers() {
    this.adminService.getUsers().subscribe((res) => {
      this.users = res;
      this.cdr.detectChanges();
    });
  }

  openRoleModal(user: any) {
    this.selectedUser = user;
    this.newRole = user.role;
  }

  updateRole() {
    this.adminService
      .changeRole({
        userId: this.selectedUser.id,
        newRole: this.newRole,
      })
      .subscribe(() => {
        const user = this.users.find((u) => u.id === this.selectedUser.id);
        if (user) user.role = this.newRole;

        this.selectedUser = null;
        this.cdr.detectChanges();
      });
  }
}
