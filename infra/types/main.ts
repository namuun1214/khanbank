import { gql } from "apollo-server";

export const mainSchema = gql`
  type Query {
    HelloWorld: String
    GetPresignedUrl(key: String): String
  }

  type Mutation {
    HelloWorld2: String
  }
`;
