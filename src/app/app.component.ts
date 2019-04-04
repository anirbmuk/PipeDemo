import { Component, OnInit } from '@angular/core';
import { PlanModel } from './model/plan.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  plans: PlanModel[] = [];
  private plan1 = new PlanModel('Plan 1', ['New Delhi', 'Kolkata', 'Chennai', 'Mumbai', 'Bangalore', 'Hyderabad']);
  private plan2 = new PlanModel('Plan 2', ['New Delhi']);
  private plan3 = new PlanModel('Plan 3', ['Thiruvananthapuram', 'Ooty', 'Goa', 'Puri']);

  ngOnInit(): void {
    this.plans.push(this.plan1);
    this.plans.push(this.plan2);
    this.plans.push(this.plan3);
  }
}
