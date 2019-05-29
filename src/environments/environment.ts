// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  url_user: 'https://www.sanratsolutions.com/dev/usuarios/public/users',
  url_module: 'https://www.sanratsolutions.com/dev/usuarios/public/modules',
  url_component: 'https://www.sanratsolutions.com/dev/usuarios/public/components',
  url_rol: 'https://www.sanratsolutions.com/dev/usuarios/public/rols',
  url_rol_option: 'https://www.sanratsolutions.com/dev/usuarios/public/rols_options',
  url_option: 'https://www.sanratsolutions.com/dev/usuarios/public/options',
  url_category: 'https://www.sanratsolutions.com/dev/usuarios/public/categories',
  url_parameter: 'https://www.sanratsolutions.com/dev/usuarios/public/parameters',
  url_storage: 'https://www.sanratsolutions.com/dev/usuarios/storage/app/public/',
  url_service_enterprise: 'https://www.sanratsolutions.com/dev/usuarios/public/service_enterprise',

  url_authentication: 'https://www.sanratsolutions.com/dev/ventas/public/authentication',
  url_person: 'https://www.sanratsolutions.com/dev/ventas/public/persons',
  url_enterprise: 'https://www.sanratsolutions.com/dev/ventas/public/enterprises',
  url_operation: 'https://www.sanratsolutions.com/dev/ventas/public/operations',
  url_products: 'https://www.sanratsolutions.com/dev/ventas/public/products',
  url_payment: 'https://www.sanratsolutions.com/dev/ventas/public/payments',
  url_expenses: 'https://www.sanratsolutions.com/dev/ventas/public/expenses',


  clearMessageDelayMs: 5000,
  refreshInterval: 1000,
  min_products: 20,
  medium_products: 50,
  days_sold: 7,
  consolidate_day: 2,

  type_operation_purchase: 'PURCHASE',
  type_operation_sale: 'SALE',

  state_user: 'STATE_USER',
  type_payment: 'PAYMENT_TYPE',
  type_enterprise: 'TYPE_ENTERPRISE',
  discounts_purchase: 'DISCOUNTS_PURCHASE',
  type_ids: 'TYPE_ID',
  efecty_payment: 'Efectivo',
  credit_payment: 'Crédito',
  category_product: 'CATEGORY_PRODUCT',
  presentation_product: 'PRODUCT_PRESENTATION',
  clothes: 'VESTUARIO',
  medicines: 'MEDICAMENTO',
  foods: 'ALIMENTO',
  package: 'PAQUETE',
  individual: 'INDIVIDUAL',
  tax_purchase: 'TAX_PURCHASE',
  positions_person: 'POSITION_PERSON',
  enterprise_owner: 'OWNER',
  enterprise_provider: 'PROVIDER',
  laboral_state: 'LABORAL_STATE',
  product_type: 'PRODUCT_TYPE',
  type_expense: 'TYPE_EXPENSE',
  rol_client: 'Cliente',
  rol_employee: 'Employee',
  state_rol_person_active: 'Activo',


  state_initial_purchase: 'CREADA',
  state_payment_purchase: 'PAGADA',
  state_opened_purchase: 'ABIERTA',

  sales: 'SALE',
  purchase: 'PURCHASE',

  type_product_purchase: 'COMPRA_PROVEEDORES'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
