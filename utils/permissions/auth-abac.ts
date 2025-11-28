import { Roles } from '@/types/users'

type User = {
  blockedBy: string[]
  roles: Roles[]
  id: string
}

type PermissionCheck<Key extends keyof Permissions> =
  | boolean
  | ((user: User, data: Permissions[Key]['dataType']) => boolean)

type RolesWithPermissions = {
  [R in Roles]: Partial<{
    [Key in keyof Permissions]: Partial<{
      [Action in Permissions[Key]['action']]: PermissionCheck<Key>
    }>
  }>
}

type Permissions = {
  ['creator-list']: {
    dataType: {
      userId: string
    }
    action: 'view'
  }
  ['is-creator']: {
    dataType: {
      userId: string
    }
    action: 'view' | 'update' | 'create'
  }
  ['is-brand']: {
    dataType: {
      userId: string
    }
    action: 'view' | 'update' | 'create'
  }
}

const ROLES = {
  CREATOR: {
    ['creator-list']: {
      view: true
    },
    ['is-creator']: {
      view: true,
      update: true,
      create: true
    },
    ['is-brand']: {
      view: false,
      update: false,
      create: false
    }
  },
  BRAND: {
    ['creator-list']: {
      view: true
    },
    ['is-creator']: {
      view: false,
      update: false,
      create: false
    },
    ['is-brand']: {
      view: true,
      update: true,
      create: true
    }
  }
} as const as RolesWithPermissions

export function hasPermission<Resource extends keyof Permissions> (
  user: User,
  resource: Resource,
  action: Permissions[Resource]['action'],
  data?: Permissions[Resource]['dataType']
) {
  return user.roles.some(role => {
    // Check if the role exists in ROLES
    if (!(role in ROLES)) return false

    // Check if the resource exists for this role
    const resourcePermissions = ROLES[role as keyof typeof ROLES][resource]
    if (!resourcePermissions) return false

    // Check if the action exists for this resource
    const permission = resourcePermissions[action]
    if (permission == null) return false

    if (typeof permission === 'boolean') return permission
    return (
      data != null &&
      (
        permission as (
          user: User,
          data: Permissions[Resource]['dataType']
        ) => boolean
      )(user, data)
    )
  })
}
