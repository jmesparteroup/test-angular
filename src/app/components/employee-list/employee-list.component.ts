import { Component, OnInit } from '@angular/core';
import { GraphqlService } from 'src/app/services/graphql.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  public employees: any[] = [];

  constructor(private graphqlService: GraphqlService) { }

  ngOnInit(): void {
    this.graphqlService.getEmployees().valueChanges.subscribe(({ data, loading }) => {
      this.employees = data.employees;
    });
  }
}
//In this example, we subscribe to the getEmployees() method and assign the result to the employees property.