const fuzzysort = require('fuzzysort')

const sets = require('../../../../build/allSets.json')
const permissions = require('../../../../build/allPermissions.json')

class PermIndexJSON {
  getPermission({ namespace, name, match }) {
    let myPermission = permissions

    myPermission = myPermission.map((permission) => {
      permission.default = permission.default.toUpperCase()
      permission.id = Buffer.from(
        permission.namespace + '@@@' + permission.name,
      ).toString('base64')

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

  paginate(elements, { first, offset, after }) {
    let paginated = elements
    if (offset) {
      paginated = paginated.slice(offset)
    }

    if (after) {
      let afterIndex

      for (let i in elements) {
        if (elements[i].id === after) {
          afterIndex = i
          break
        }
      }

      paginated = paginated.slice(afterIndex)
      paginated.shift()
    }

    return paginated.slice(0, first)
  }

  getPermissions({ namespace, set, search, first, offset, after }) {
    let myPermissions = permissions

    myPermissions = myPermissions.map((permission) => {
      permission.default = permission.default.toUpperCase()
      permission.id = Buffer.from(
        permission.namespace + '@@@' + permission.name,
      ).toString('base64')

      return permission
    })

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

    if (first) return this.paginate(myPermissions, { first, offset, after })

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

  getSets({ namespace, first, offset, after }) {
    let mySets = sets

    if (namespace)
      mySets.filter((set) => {
        return set.namespace.toLowerCase() === namespace.toLowerCase()
      })

    if (first) return this.paginate(myPermissions, { first, offset, after })

    return mySets
  }
}

module.exports = PermIndexJSON
