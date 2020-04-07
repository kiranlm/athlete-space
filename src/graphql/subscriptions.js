/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAthlete = /* GraphQL */ `
  subscription OnCreateAthlete(
    $id: ID
    $name: String
    $email: String
    $age: String
    $gender: String
  ) {
    onCreateAthlete(
      id: $id
      name: $name
      email: $email
      age: $age
      gender: $gender
    ) {
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
export const onUpdateAthlete = /* GraphQL */ `
  subscription OnUpdateAthlete(
    $id: ID
    $name: String
    $email: String
    $age: String
    $gender: String
  ) {
    onUpdateAthlete(
      id: $id
      name: $name
      email: $email
      age: $age
      gender: $gender
    ) {
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
export const onDeleteAthlete = /* GraphQL */ `
  subscription OnDeleteAthlete(
    $id: ID
    $name: String
    $email: String
    $age: String
    $gender: String
  ) {
    onDeleteAthlete(
      id: $id
      name: $name
      email: $email
      age: $age
      gender: $gender
    ) {
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
