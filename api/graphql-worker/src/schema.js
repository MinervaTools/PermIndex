const { gql } = require('apollo-server-cloudflare')

module.exports = gql`
  type Set {
    id: ID!
    namespace: String!
    name: String!
    description: String!
    documentation: String
    childPermissions(first: Int, offset: Int, after: ID): [Permission]
  }

  enum PermissionDefault {
    TRUE
    OP
    FALSE
  }

  type PermissionAffectedCommand {
    command: String!
    comment: String
  }

  type Permission {
    id: ID!
    name: String!
    namespace: String!
    set: Set!
    description: String
    match: String
    default: PermissionDefault
    affectedCommands: [PermissionAffectedCommand]
  }

  type Query {
    permission(namespace: String, name: String, match: String): Permission
    allPermissions(
      namespace: String
      set: String
      search: String
      first: Int
      offset: Int
      after: ID
    ): [Permission]

    set(id: String!): Set
    allSets(namespace: String, first: Int, offset: Int, after: ID): [Set]
  }
`
