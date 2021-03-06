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
  url_service_enterprise: 'http://localhost/usuariosV0/public/service-enterprise',
  url_payment_service: 'http://localhost/usuariosV0/public/payment-service',
  url_access_enterprise:'http://localhost/usuariosV0/public/access_enterprise',
  url_parameter_config: 'http://localhost/usuariosV0/public/parameter_config',
  url_visualization_rol: 'http://localhost/usuariosV0/public/visualization_rol',
  url_refresh_users: 'http://localhost/usuariosV0/public/clear',
  
  url_refresh_sales: 'http://localhost/ventasV0/public/clear',
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
  url_enterprise_person: 'http://localhost/ventasV0/public/enterprise_person',
  url_laboral_condition: 'http://localhost/ventasV0/public/laboral_condition',
  url_worker_news: 'http://localhost/ventasV0/public/worker_news',
  url_payment_employee: 'http://localhost/ventasV0/public/paying_employee',
  url_preference_client: 'http://localhost/ventasV0/public/preference_client',
  url_sales_storage: 'http://localhost/ventasV0/storage/app/public/',
  url_financial_report: 'http://localhost/ventasV0/public/financial_report',

  url_credit_line: 'http://localhost/creditsV0/public/credit_line',
  url_associated_info: 'http://localhost/creditsV0/public/associated_info',
  url_credit_associated: 'http://localhost/creditsV0/public/credit_associated',
  url_credit_payment: 'http://localhost/creditsV0/public/credit_payment',
  url_associated_contribution: 'http://localhost/creditsV0/public/associated_contribution',
  url_authentication_credits: 'http://localhost/creditsV0/public/authentication',
  url_refresh_credits: 'http://localhost/creditsV0/public/clear',

  clearMessageDelayMs: 5000,
  refreshInterval: 1000,
  min_products: 20,
  medium_products: 50,
  days_sold: 7,
  consolidate_day: 7,

  type_operation_purchase: 'PURCHASE',
  type_operation_sale: 'SALE',

  type_disaggregated: 'disaggregate',
  type_aggregated: 'aggregate',

  state_user: 'STATE_USER',
  type_payment: 'PAYMENT_TYPE',
  type_enterprise: 'TYPE_ENTERPRISE',
  discounts_purchase: 'DISCOUNTS_PURCHASE',
  type_ids: 'TYPE_ID',
  efecty_payment: 'Efectivo',
  credit_payment: 'Crédito',
  separated_payment: 'Separado',
  category_product: 'CATEGORY_PRODUCT',
  presentation_product: 'PRODUCT_PRESENTATION',
  clothes: 'VESTUARIO',
  medicines: 'MEDICAMENTO',
  foods: 'ALIMENTO',
  chemicalInput: 'INSUMO',
  package: 'PAQUETE',
  individual: 'INDIVIDUAL',
  tax_purchase: 'TAX_PURCHASE',
  positions_person: 'POSITION_PERSON',
  enterprise_owner: 'PROPERTY_SYSTEM',
  enterprise_provider: 'PROVIDER',
  laboral_state: 'LABORAL_STATE',
  product_type: 'PRODUCT_TYPE',
  type_expense: 'TYPE_EXPENSE',
  rol_client: 'Cliente',
  rol_employee: 'Employee',
  state_rol_person_active: 'Activo',
  salary_type: 'SALARY_TYPE',
  contract_type: 'TYPE_CONTRACT',
  cutting_period_production: 'CUTTING_PERIOD_PRODUCTION',
  parameters_enterprises: 'PARAMETERS_ENTERPRISES',
  regimen: 'REGIMEN_ENTERPRISE',
  type_worker_new: 'TYPE_WORKER_NEW',
  period_report: 'PERIOD_REPORT',
  laboral_period: 'LABORAL_PERIOD',

  url_web_service: 'URL_WEB_SERVICE',
  enterprise_fact: 'ENTERPRISE_FACT',
  prefix_sale: 'PREFIX_SALE',
  current_invoice: 'CURRENT_INVOICE',
  current_sale: 'CURRENT_SALE',
  invoice_init: 'INVOICE_INIT',
  invoice_end: 'INVOICE_END',
  prefix_invoice: 'PREFIX_INVOICE',

  enterprise_purchase_fact: 'ENTERPRISE_PURCHASE',
  prefix_purchase: 'PREFIX_PURCHASE',
  current_purchase: 'CURRENT_PURCHASE',
  current_voucher: 'CURRENT_VOUCHER',

  state_initial_purchase: 'CREADA',
  state_payment_purchase: 'PAGADA',
  state_opened_purchase: 'ABIERTA',
  state_block: 'BLOQUEADA',

  sales: 'SALE',
  purchase: 'PURCHASE',

  mode_service: 'MODE_SERVICE',
  type_service: 'TYPE_SERVICE',
  size_enterprise: 'SIZE_ENTERPRISE',

  type_product_purchase: 'Compra a proveedores',
  type_product_internal_prd: 'Producción interna',
  type_product_input: 'INSUMO',
  type_product_intermediaty: 'Producto Intermedio',
  type_product_comercializable: 'Producto comercializable',

  laboral_state_active: 'Activo',
  laboral_state_inactive: 'Inactivo',

  cutting_active_state: 'Abierto',
  state_service: 'STATE_SERVICE',
  debt_time_invocie: 'DEBT_TIME_INVOICE',

  category_clothes: 'CATEGORY_CLOTHES',
  sizes_clothes: 'SIZES_CLOTHES',
  
  term_interest: 'TERM_INTEREST',
  state_credit_solicited: 'Solicitado',
  state_credit_approved: 'Aprobado',
  state_credit_disbursment: 'Desembolsado',
  state_credit_paid_out: 'Pagado',

  financial_performance: 3,
  max_approval: 5,
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
