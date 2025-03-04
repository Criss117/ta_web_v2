/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as DashboardLayoutImport } from './routes/dashboard/_layout'
import { Route as DashboardLayoutIndexImport } from './routes/dashboard/_layout/index'
import { Route as DashboardLayoutProductsIndexImport } from './routes/dashboard/_layout/products/index'
import { Route as DashboardLayoutClientsIndexImport } from './routes/dashboard/_layout/clients/index'
import { Route as DashboardLayoutClientsIdentifierIndexImport } from './routes/dashboard/_layout/clients/$identifier/index'
import { Route as DashboardLayoutProductsBarcodeEditImport } from './routes/dashboard/_layout/products/$barcode/edit'
import { Route as DashboardLayoutClientsIdentifierEditImport } from './routes/dashboard/_layout/clients/$identifier/edit'

// Create Virtual Routes

const DashboardImport = createFileRoute('/dashboard')()
const DashboardLayoutProductsCreateLazyImport = createFileRoute(
  '/dashboard/_layout/products/create',
)()
const DashboardLayoutClientsCreateLazyImport = createFileRoute(
  '/dashboard/_layout/clients/create',
)()

// Create/Update Routes

const DashboardRoute = DashboardImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const DashboardLayoutRoute = DashboardLayoutImport.update({
  id: '/_layout',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardLayoutIndexRoute = DashboardLayoutIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => DashboardLayoutRoute,
} as any)

const DashboardLayoutProductsIndexRoute =
  DashboardLayoutProductsIndexImport.update({
    id: '/products/',
    path: '/products/',
    getParentRoute: () => DashboardLayoutRoute,
  } as any)

const DashboardLayoutClientsIndexRoute =
  DashboardLayoutClientsIndexImport.update({
    id: '/clients/',
    path: '/clients/',
    getParentRoute: () => DashboardLayoutRoute,
  } as any)

const DashboardLayoutProductsCreateLazyRoute =
  DashboardLayoutProductsCreateLazyImport.update({
    id: '/products/create',
    path: '/products/create',
    getParentRoute: () => DashboardLayoutRoute,
  } as any).lazy(() =>
    import('./routes/dashboard/_layout/products/create.lazy').then(
      (d) => d.Route,
    ),
  )

const DashboardLayoutClientsCreateLazyRoute =
  DashboardLayoutClientsCreateLazyImport.update({
    id: '/clients/create',
    path: '/clients/create',
    getParentRoute: () => DashboardLayoutRoute,
  } as any).lazy(() =>
    import('./routes/dashboard/_layout/clients/create.lazy').then(
      (d) => d.Route,
    ),
  )

const DashboardLayoutClientsIdentifierIndexRoute =
  DashboardLayoutClientsIdentifierIndexImport.update({
    id: '/clients/$identifier/',
    path: '/clients/$identifier/',
    getParentRoute: () => DashboardLayoutRoute,
  } as any)

const DashboardLayoutProductsBarcodeEditRoute =
  DashboardLayoutProductsBarcodeEditImport.update({
    id: '/products/$barcode/edit',
    path: '/products/$barcode/edit',
    getParentRoute: () => DashboardLayoutRoute,
  } as any)

const DashboardLayoutClientsIdentifierEditRoute =
  DashboardLayoutClientsIdentifierEditImport.update({
    id: '/clients/$identifier/edit',
    path: '/clients/$identifier/edit',
    getParentRoute: () => DashboardLayoutRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/dashboard': {
      id: '/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardImport
      parentRoute: typeof rootRoute
    }
    '/dashboard/_layout': {
      id: '/dashboard/_layout'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardLayoutImport
      parentRoute: typeof DashboardRoute
    }
    '/dashboard/_layout/': {
      id: '/dashboard/_layout/'
      path: '/'
      fullPath: '/dashboard/'
      preLoaderRoute: typeof DashboardLayoutIndexImport
      parentRoute: typeof DashboardLayoutImport
    }
    '/dashboard/_layout/clients/create': {
      id: '/dashboard/_layout/clients/create'
      path: '/clients/create'
      fullPath: '/dashboard/clients/create'
      preLoaderRoute: typeof DashboardLayoutClientsCreateLazyImport
      parentRoute: typeof DashboardLayoutImport
    }
    '/dashboard/_layout/products/create': {
      id: '/dashboard/_layout/products/create'
      path: '/products/create'
      fullPath: '/dashboard/products/create'
      preLoaderRoute: typeof DashboardLayoutProductsCreateLazyImport
      parentRoute: typeof DashboardLayoutImport
    }
    '/dashboard/_layout/clients/': {
      id: '/dashboard/_layout/clients/'
      path: '/clients'
      fullPath: '/dashboard/clients'
      preLoaderRoute: typeof DashboardLayoutClientsIndexImport
      parentRoute: typeof DashboardLayoutImport
    }
    '/dashboard/_layout/products/': {
      id: '/dashboard/_layout/products/'
      path: '/products'
      fullPath: '/dashboard/products'
      preLoaderRoute: typeof DashboardLayoutProductsIndexImport
      parentRoute: typeof DashboardLayoutImport
    }
    '/dashboard/_layout/clients/$identifier/edit': {
      id: '/dashboard/_layout/clients/$identifier/edit'
      path: '/clients/$identifier/edit'
      fullPath: '/dashboard/clients/$identifier/edit'
      preLoaderRoute: typeof DashboardLayoutClientsIdentifierEditImport
      parentRoute: typeof DashboardLayoutImport
    }
    '/dashboard/_layout/products/$barcode/edit': {
      id: '/dashboard/_layout/products/$barcode/edit'
      path: '/products/$barcode/edit'
      fullPath: '/dashboard/products/$barcode/edit'
      preLoaderRoute: typeof DashboardLayoutProductsBarcodeEditImport
      parentRoute: typeof DashboardLayoutImport
    }
    '/dashboard/_layout/clients/$identifier/': {
      id: '/dashboard/_layout/clients/$identifier/'
      path: '/clients/$identifier'
      fullPath: '/dashboard/clients/$identifier'
      preLoaderRoute: typeof DashboardLayoutClientsIdentifierIndexImport
      parentRoute: typeof DashboardLayoutImport
    }
  }
}

// Create and export the route tree

interface DashboardLayoutRouteChildren {
  DashboardLayoutIndexRoute: typeof DashboardLayoutIndexRoute
  DashboardLayoutClientsCreateLazyRoute: typeof DashboardLayoutClientsCreateLazyRoute
  DashboardLayoutProductsCreateLazyRoute: typeof DashboardLayoutProductsCreateLazyRoute
  DashboardLayoutClientsIndexRoute: typeof DashboardLayoutClientsIndexRoute
  DashboardLayoutProductsIndexRoute: typeof DashboardLayoutProductsIndexRoute
  DashboardLayoutClientsIdentifierEditRoute: typeof DashboardLayoutClientsIdentifierEditRoute
  DashboardLayoutProductsBarcodeEditRoute: typeof DashboardLayoutProductsBarcodeEditRoute
  DashboardLayoutClientsIdentifierIndexRoute: typeof DashboardLayoutClientsIdentifierIndexRoute
}

const DashboardLayoutRouteChildren: DashboardLayoutRouteChildren = {
  DashboardLayoutIndexRoute: DashboardLayoutIndexRoute,
  DashboardLayoutClientsCreateLazyRoute: DashboardLayoutClientsCreateLazyRoute,
  DashboardLayoutProductsCreateLazyRoute:
    DashboardLayoutProductsCreateLazyRoute,
  DashboardLayoutClientsIndexRoute: DashboardLayoutClientsIndexRoute,
  DashboardLayoutProductsIndexRoute: DashboardLayoutProductsIndexRoute,
  DashboardLayoutClientsIdentifierEditRoute:
    DashboardLayoutClientsIdentifierEditRoute,
  DashboardLayoutProductsBarcodeEditRoute:
    DashboardLayoutProductsBarcodeEditRoute,
  DashboardLayoutClientsIdentifierIndexRoute:
    DashboardLayoutClientsIdentifierIndexRoute,
}

const DashboardLayoutRouteWithChildren = DashboardLayoutRoute._addFileChildren(
  DashboardLayoutRouteChildren,
)

interface DashboardRouteChildren {
  DashboardLayoutRoute: typeof DashboardLayoutRouteWithChildren
}

const DashboardRouteChildren: DashboardRouteChildren = {
  DashboardLayoutRoute: DashboardLayoutRouteWithChildren,
}

const DashboardRouteWithChildren = DashboardRoute._addFileChildren(
  DashboardRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/dashboard': typeof DashboardLayoutRouteWithChildren
  '/dashboard/': typeof DashboardLayoutIndexRoute
  '/dashboard/clients/create': typeof DashboardLayoutClientsCreateLazyRoute
  '/dashboard/products/create': typeof DashboardLayoutProductsCreateLazyRoute
  '/dashboard/clients': typeof DashboardLayoutClientsIndexRoute
  '/dashboard/products': typeof DashboardLayoutProductsIndexRoute
  '/dashboard/clients/$identifier/edit': typeof DashboardLayoutClientsIdentifierEditRoute
  '/dashboard/products/$barcode/edit': typeof DashboardLayoutProductsBarcodeEditRoute
  '/dashboard/clients/$identifier': typeof DashboardLayoutClientsIdentifierIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/dashboard': typeof DashboardLayoutIndexRoute
  '/dashboard/clients/create': typeof DashboardLayoutClientsCreateLazyRoute
  '/dashboard/products/create': typeof DashboardLayoutProductsCreateLazyRoute
  '/dashboard/clients': typeof DashboardLayoutClientsIndexRoute
  '/dashboard/products': typeof DashboardLayoutProductsIndexRoute
  '/dashboard/clients/$identifier/edit': typeof DashboardLayoutClientsIdentifierEditRoute
  '/dashboard/products/$barcode/edit': typeof DashboardLayoutProductsBarcodeEditRoute
  '/dashboard/clients/$identifier': typeof DashboardLayoutClientsIdentifierIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/dashboard': typeof DashboardRouteWithChildren
  '/dashboard/_layout': typeof DashboardLayoutRouteWithChildren
  '/dashboard/_layout/': typeof DashboardLayoutIndexRoute
  '/dashboard/_layout/clients/create': typeof DashboardLayoutClientsCreateLazyRoute
  '/dashboard/_layout/products/create': typeof DashboardLayoutProductsCreateLazyRoute
  '/dashboard/_layout/clients/': typeof DashboardLayoutClientsIndexRoute
  '/dashboard/_layout/products/': typeof DashboardLayoutProductsIndexRoute
  '/dashboard/_layout/clients/$identifier/edit': typeof DashboardLayoutClientsIdentifierEditRoute
  '/dashboard/_layout/products/$barcode/edit': typeof DashboardLayoutProductsBarcodeEditRoute
  '/dashboard/_layout/clients/$identifier/': typeof DashboardLayoutClientsIdentifierIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/dashboard'
    | '/dashboard/'
    | '/dashboard/clients/create'
    | '/dashboard/products/create'
    | '/dashboard/clients'
    | '/dashboard/products'
    | '/dashboard/clients/$identifier/edit'
    | '/dashboard/products/$barcode/edit'
    | '/dashboard/clients/$identifier'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/dashboard'
    | '/dashboard/clients/create'
    | '/dashboard/products/create'
    | '/dashboard/clients'
    | '/dashboard/products'
    | '/dashboard/clients/$identifier/edit'
    | '/dashboard/products/$barcode/edit'
    | '/dashboard/clients/$identifier'
  id:
    | '__root__'
    | '/'
    | '/dashboard'
    | '/dashboard/_layout'
    | '/dashboard/_layout/'
    | '/dashboard/_layout/clients/create'
    | '/dashboard/_layout/products/create'
    | '/dashboard/_layout/clients/'
    | '/dashboard/_layout/products/'
    | '/dashboard/_layout/clients/$identifier/edit'
    | '/dashboard/_layout/products/$barcode/edit'
    | '/dashboard/_layout/clients/$identifier/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  DashboardRoute: typeof DashboardRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  DashboardRoute: DashboardRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/dashboard"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/dashboard": {
      "filePath": "dashboard",
      "children": [
        "/dashboard/_layout"
      ]
    },
    "/dashboard/_layout": {
      "filePath": "dashboard/_layout.tsx",
      "parent": "/dashboard",
      "children": [
        "/dashboard/_layout/",
        "/dashboard/_layout/clients/create",
        "/dashboard/_layout/products/create",
        "/dashboard/_layout/clients/",
        "/dashboard/_layout/products/",
        "/dashboard/_layout/clients/$identifier/edit",
        "/dashboard/_layout/products/$barcode/edit",
        "/dashboard/_layout/clients/$identifier/"
      ]
    },
    "/dashboard/_layout/": {
      "filePath": "dashboard/_layout/index.tsx",
      "parent": "/dashboard/_layout"
    },
    "/dashboard/_layout/clients/create": {
      "filePath": "dashboard/_layout/clients/create.lazy.tsx",
      "parent": "/dashboard/_layout"
    },
    "/dashboard/_layout/products/create": {
      "filePath": "dashboard/_layout/products/create.lazy.tsx",
      "parent": "/dashboard/_layout"
    },
    "/dashboard/_layout/clients/": {
      "filePath": "dashboard/_layout/clients/index.tsx",
      "parent": "/dashboard/_layout"
    },
    "/dashboard/_layout/products/": {
      "filePath": "dashboard/_layout/products/index.tsx",
      "parent": "/dashboard/_layout"
    },
    "/dashboard/_layout/clients/$identifier/edit": {
      "filePath": "dashboard/_layout/clients/$identifier/edit.tsx",
      "parent": "/dashboard/_layout"
    },
    "/dashboard/_layout/products/$barcode/edit": {
      "filePath": "dashboard/_layout/products/$barcode/edit.tsx",
      "parent": "/dashboard/_layout"
    },
    "/dashboard/_layout/clients/$identifier/": {
      "filePath": "dashboard/_layout/clients/$identifier/index.tsx",
      "parent": "/dashboard/_layout"
    }
  }
}
ROUTE_MANIFEST_END */
