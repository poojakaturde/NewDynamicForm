import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  formData: any;
  displayedColumns: string[] = ['name', 'status', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private http: HttpClient, private router: Router, private shared: SharedService) { }

  ngOnInit(): void {
    this.getFormList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getFormList() {
    this.http.get("https://cda1-210-16-95-127.in.ngrok.io/dynamicform/getAll").subscribe((res) => {
      this.formData = res;
      this.dataSource = new MatTableDataSource(this.formData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  createForm() {
    this.router.navigate(['formCreate'])
  }

  viewForm(data: any) {
    this.shared.sendPreviewFormData(data);
    this.router.navigate(['formPreview'])
  }


  deleteForm(data: any) {
    this.http.delete("https://cda1-210-16-95-127.in.ngrok.io/dynamicform/delete?id=" + data._id).subscribe((res) => {
      console.log(res);
      this.getFormList();
    })
  }

  createEligibilityForm() {
    this.router.navigate(['eligibilityCheck'])
  }

}
