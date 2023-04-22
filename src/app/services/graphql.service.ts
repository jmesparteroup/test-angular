import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {
  private endpoint = 'http://localhost:3000/graphql';

  constructor(private apollo: Apollo, private httpLink: HttpLink) {
    const http = httpLink.create({ uri: this.endpoint });

    this.apollo.create({
      link: http,
      cache: new InMemoryCache(),
      connectToDevTools: true
    });
  }

  public getEmployees() {
    const query = gql`
      query {
        employees {
          id
          name
          email
        }
      }
    `;

    return this.apollo.watchQuery<any>({
      query: query,
      fetchPolicy: 'network-only'
    });
  }
}
//In this example, we define a getEmployees() method that queries the employees field in our GraphQL server and returns the result as an observable.