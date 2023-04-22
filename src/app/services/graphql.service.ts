import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink, ApolloClient, InMemoryCache } from '@apollo/client/core';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {
  private endpoint = 'http://localhost:3000/graphql';

  constructor(private apollo: Apollo, private httpLink: HttpLink) {
    const http = new HttpLink({ uri: this.endpoint });

    new ApolloClient({
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