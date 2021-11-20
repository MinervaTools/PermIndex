const { gql } = require('apollo-server-cloudflare')

module.exports = gql`
  type Set {
    namespace: String!
    id: String!
    name: String!
    description: String!
    documentation: String
    childPermissions: [Permission]
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
    allPermissions(namespace: String, set: String, search: String): [Permission]

    set(id: String!): Set
    allSets(namespace: String): [Set]
  }
`
