const fuzzysort = require('fuzzysort')

const sets = require('../../../../build/allSets.json')
const permissions = require('../../../../build/allPermissions.json')

class PermIndexJSON {
  getPermission({ namespace, name, match }) {
    let myPermission = permissions

    myPermission = myPermission.map((permission) => {
      permission.default = permission.default.toUpperCase()

      return permission
    })

    if (namespace) {
      myPermission = myPermission.filter((permission) => {
        return permission.namespace.toLowerCase() === namespace.toLowerCase()
      })
    }

    if (name) {
      myPermission = myPermission.filter((permission) => {
        return permission.name.toLowerCase() === name.toLowerCase()
      })
    }

    if (match) {
      myPermission = myPermission.filter((permission) => {
        if (permission.name.toLowerCase() === match.toLowerCase()) return true

        if (typeof permission.match !== undefined) {
          var match2 = new RegExp(permission.match)

          match2.test(match)
        }

        return false
      })
    }

    return myPermission[0]
  }
  getPermissions({ namespace, set, search }) {
    let myPermissions = permissions

    if (namespace) {
      myPermissions = myPermissions.filter((permission) => {
        return permission.namespace.toLowerCase() === namespace.toLowerCase()
      })
    }

    if (set) {
      myPermissions = myPermissions.filter((permission) => {
        return permission.set.toLowerCase() === set.toLowerCase()
      })
    }

    if (search) {
      myPermissions = fuzzysort
        .go(search, myPermissions, {
          key: 'name',
        })
        .map((res) => {
          return res.obj
        })
    }

    return myPermissions
  }

  getSet({ id, namespace }) {
    for (let i in sets) {
      let set = sets[i]

      if (namespace && set.namespace.toLowerCase() !== namespace.toLowerCase())
        continue

      if (set.id.toLowerCase() === id.toLowerCase()) return set
    }

    return null
  }

  getSets({ namespace }) {
    let mySets = sets

    if (namespace)
      mySets.filter((set) => {
        return set.namespace.toLowerCase() === namespace.toLowerCase()
      })

    return mySets
  }
}

module.exports = PermIndexJSON
