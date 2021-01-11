import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreditLimitService } from '../services/credit-limit.service';
import { ICreditLimit } from '../shared/models/credit-limit';

@Component({
  selector: 'app-credit-limit',
  templateUrl: './credit-limit.page.html',
  styleUrls: ['./credit-limit.page.scss'],
})
export class CreditLimitPage implements OnInit {
  requests:ICreditLimit[]=[];
  constructor(private crService: CreditLimitService, private router: Router) { }

  ngOnInit() {
    this.crService.getAll().subscribe(
      data=>{
        this.requests = data;
      }
    )
  }
  createRequest(){
    this.router.navigate(['/','credit-limit', 'credit-limit-form']);   
  }
  onEdit(id){
    this.router.navigate(['/','credit-limit', 'credit-limit-form']);   
  }
}
