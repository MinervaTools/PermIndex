module.exports = {
  Query: {
    permission: (_source, filter, { dataSources }) => {
      return dataSources.permIndex.getPermission(filter)
    },
    allPermissions: (_source, filter, { dataSources }) => {
      return dataSources.permIndex.getPermissions(filter)
    },

    set: (_source, filter, { dataSources }) => {
      return dataSources.permIndex.getSet(filter)
    },
    allSets: (_source, filter, { dataSources }) => {
      return dataSources.permIndex.getSets(filter)
    },
  },
  Permission: {
    set: (permission, {}, { dataSources }) => {
      return dataSources.permIndex.getSet({
        namespace: permission.namespace,
        id: permission.set,
      })
    },
  },
  Set: {
    childPermissions: (set, args, { dataSources }) => {
      return dataSources.permIndex.getPermissions({
        namespace: set.namespace,
        set: set.id,
        ...args,
      })
    },
  },
}
