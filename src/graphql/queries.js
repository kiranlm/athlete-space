/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAthlete = /* GraphQL */ `
  query GetAthlete($id: ID!) {
    getAthlete(id: $id) {
      id
      name
      email
      age
      gender
      country
      metrics
    }
  }
`;
export const listAthletes = /* GraphQL */ `
  query ListAthletes(
    $filter: TableAthleteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAthletes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        age
        gender
        country
        metrics
      }
      nextToken
    }
  }
`;
