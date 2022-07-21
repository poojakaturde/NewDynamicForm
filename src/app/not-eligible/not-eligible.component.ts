import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-not-eligible',
  templateUrl: './not-eligible.component.html',
  styleUrls: ['./not-eligible.component.scss']
})
export class NotEligibleComponent implements OnInit {

  errorResponse:any;
  constructor(private shared: SharedService, private router: Router) { }

  ngOnInit(): void {
    this.errorResponse = this.shared.getResponseData();
    console.log(this.errorResponse);
  }

  getBackToForm(){
    this.router.navigate(['eligible'])
  }

}
