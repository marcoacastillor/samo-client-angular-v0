export const environment = {
  production: true,

  /*
  url_user: 'https://www.sanratsolutions.com/prd/usuarios/public/users',
  url_module: 'https://www.sanratsolutions.com/prd/usuarios/public/modules',
  url_component: 'https://www.sanratsolutions.com/prd/usuarios/public/components',
  url_rol: 'https://www.sanratsolutions.com/prd/usuarios/public/rols',
  url_rol_option: 'https://www.sanratsolutions.com/prd/usuarios/public/rols_options',
  url_option: 'https://www.sanratsolutions.com/prd/usuarios/public/options',
  url_category: 'https://www.sanratsolutions.com/prd/usuarios/public/categories',
  url_parameter: 'https://www.sanratsolutions.com/prd/usuarios/public/parameters',
  url_storage: 'https://www.sanratsolutions.com/prd/usuarios/storage/app/public/',
  url_ventas_storage: 'https://www.sanratsolutions.com/prd/ventas/storage/app/public/',
  url_type_service: 'https://www.sanratsolutions.com/prd/usuarios/public/type_service',
  url_parameter_config: 'https://www.sanratsolutions.com/prd/usuarios/public/parameter_config',
  url_refresh_users: 'https://www.sanratsolutions.com/prd/usuarios/public/clear',
  
  url_refresh_sales: 'https://www.sanratsolutions.com/prd/ventas/public/clear',
  url_authentication_ventas: 'https://www.sanratsolutions.com/prd/ventas/public/authentication',
  url_person: 'https://www.sanratsolutions.com/prd/ventas/public/persons',
  url_enterprise: 'https://www.sanratsolutions.com/prd/ventas/public/enterprises',
  url_operation: 'https://www.sanratsolutions.com/prd/ventas/public/operations',
  url_products: 'https://www.sanratsolutions.com/prd/ventas/public/products',
  url_payment: 'https://www.sanratsolutions.com/prd/ventas/public/payments',
  url_expenses: 'https://www.sanratsolutions.com/prd/ventas/public/expenses',
  url_note: 'https://www.sanratsolutions.com/prd/ventas/public/notes',
  url_position: 'https://www.sanratsolutions.com/prd/ventas/public/positions',
  url_production_process: 'https://www.sanratsolutions.com/prd/ventas/public/production_process',
  url_cutting_period: 'https://www.sanratsolutions.com/prd/ventas/public/cutting_period',
  url_cutting_period_product: 'https://www.sanratsolutions.com/prd/ventas/public/cutting_period_product',
  url_detail_product_input: 'https://www.sanratsolutions.com/prd/ventas/public/detail_product_input',
  url_operation_product: 'https://www.sanratsolutions.com/prd/ventas/public/operation_product',
  url_notes: 'https://www.sanratsolutions.com/prd/ventas/public/notes',
  url_enterprise_person: 'https://www.sanratsolutions.com/prd/ventas/public/enterprise_person',
  url_laboral_condition: 'https://www.sanratsolutions.com/prd/ventas/public/laboral_condition',
  url_worker_news: 'https://www.sanratsolutions.com/prd/ventas/public/worker_news',
  url_payment_employee: 'https://www.sanratsolutions.com/prd/ventas/public/paying_employee',
  */


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
  url_parameter_config: 'http://localhost/usuariosV0/public/parameter_config',
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
  separated_payment: 'Separado',
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

  url_web_service: 'URL_WEB_SERVICE',
  enterprise_fact: 'ENTERPRISE_FACT',
  prefix_sale: 'PREFIX_SALE',
  current_invoice: 'CURRENT_INVOICE',
  current_sale: 'CURRENT_SALE',
  invoice_init: 'INVOICE_INIT',
  invoice_end: 'INVOICE_END',
  prefix_invoice: 'PREFIX_INVOICE',

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
  type_product_internal_prd: 'Producción Interna',
  type_product_input: 'INSUMO QUIMICO',
  type_product_intermediaty: 'Producto Intermedio',

  laboral_state_active: 'Activo',
  laboral_state_inactive: 'Inactivo',

  cutting_active_state: 'Abierto',
};
