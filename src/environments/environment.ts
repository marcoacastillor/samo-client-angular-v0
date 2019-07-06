// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  url_user: 'http://localhost/usuariosV0/public/users',
  url_module: 'http://localhost/usuariosV0/public/modules',
  url_component: 'http://localhost/usuariosV0/public/components',
  url_rol: 'http://localhost/usuariosV0/public/rols',
  url_rol_option: 'http://localhost/usuariosV0/public/rols_options',
  url_option: 'http://localhost/usuariosV0/public/options',
  url_category: 'http://localhost/usuariosV0/public/categories',
  url_parameter: 'http://localhost/usuariosV0/public/parameters',
  url_storage: 'http://localhost/usuariosV0/storage/app/public/',
  url_ventas_storage: 'http://localhost/ventasV0/storage/app/public/',
  url_type_service: 'http://localhost/usuariosV0/public/type-service',

  url_authentication_ventas: 'http://localhost/ventasV0/public/authentication',
  url_person: 'http://localhost/ventasV0/public/persons',
  url_enterprise: 'http://localhost/ventasV0/public/enterprises',
  url_operation: 'http://localhost/ventasV0/public/operations',
  url_products: 'http://localhost/ventasV0/public/products',
  url_payment: 'http://localhost/ventasV0/public/payments',
  url_expenses: 'http://localhost/ventasV0/public/expenses',
  url_note: 'http://localhost/ventasV0/public/notes',
  url_position: 'http://localhost/ventasV0/public/positions',
  url_production_process: 'http://localhost/ventasV0/public/production_process',
  url_cutting_period: 'http://localhost/ventasV0/public/cutting_period',
  url_cutting_period_product: 'http://localhost/ventasV0/public/cutting_period_product',
  url_detail_product_input: 'http://localhost/ventasV0/public/detail_product_input',
  url_operation_product: 'http://localhost/ventasV0/public/operation_product',
  url_notes: 'http://localhost/ventasV0/public/notes',


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
  chemicalInput: 'INSUMO QUIMICO',
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
  salary_type: 'SALARY_TYPE',
  cutting_period_production: 'CUTTING_PERIOD_PRODUCTION',

  state_initial_purchase: 'CREADA',
  state_payment_purchase: 'PAGADA',
  state_opened_purchase: 'ABIERTA',

  sales: 'SALE',
  purchase: 'PURCHASE',

  mode_service: 'MODE_SERVICE',
  type_service: 'TYPE_SERVICE',
  size_enterprise: 'SIZE_ENTERPRISE',

  type_product_purchase: 'Compra a proveedores',
  type_product_internal_prd: 'Producción interna',
  type_product_input: 'Insumo',
  type_product_intermediaty: 'Producto Intermedio',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
