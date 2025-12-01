import { Roles } from '@/types/users'

type User = {
  blockedBy: string[]
  role: Roles | Roles[] | undefined
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
): boolean {
  const roles: Roles[] = Array.isArray(user.role)
    ? user.role
    : user.role
    ? [user.role]
    : []

  if (roles.length === 0) return false

  for (const r of roles) {
    if (!(r in ROLES)) continue
    const resourcePermissions = ROLES[r as keyof typeof ROLES][resource]
    if (!resourcePermissions) continue
    const permission = resourcePermissions[action]
    if (permission == null) continue
    if (typeof permission === 'boolean') {
      if (permission) return true
    } else if (data != null && permission(user, data)) {
      return true
    }
  }
  return false
}
