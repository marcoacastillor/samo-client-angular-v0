(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{Bmgd:function(l,n,t){"use strict";t.d(n,"a",function(){return a});var e=t("AytR"),u=t("kmKP"),o=t("15JJ"),r=t("CcnG"),i=t("t/Na"),a=function(){function l(l,n){this.http=l,this.userService=n,this._url=e.a.url_enterprise}return l.prototype.getAllByType$=function(l){var n=this,t=this._url+"/index/"+l;return this.userService.validateOptionByToken("Enterprise:getAll").pipe(Object(o.a)(function(l){if(l)return n.http.get(t)}))},l.prototype.getCypherKeyByEnterprise$=function(l){var n=this,t=this._url+"/get-cypher-key-by-enterprise/"+l.toString();return this.userService.validateOptionByToken("Enterprise:getCypherKeyByEnterprise").pipe(Object(o.a)(function(l){if(l)return n.http.get(t)}))},l.prototype.getProvidersByProduct$=function(l){var n=this,t=this._url+"/get-provider-by-product/"+l.toString();return this.userService.validateOptionByToken("Enterprise:getProviderByProduct").pipe(Object(o.a)(function(l){if(l)return n.http.get(t)}))},l.prototype.getByFilter$=function(l,n){var t=this,e=this._url+"/get-list-by-filter-and-type/"+n;return this.userService.validateOptionByToken("Enterprise:listByFilterAndType").pipe(Object(o.a)(function(n){if(n)return t.http.post(e,l)}))},l.prototype.getByNameFilter$=function(l,n){var t=this,e=this._url+"/get-list-by-name-filter-and-type/"+l+"/"+n;return this.userService.validateOptionByToken("Enterprise:getByNameFilterAndType").pipe(Object(o.a)(function(l){if(l)return t.http.get(e)}))},l.prototype.getByCodeFilter$=function(l,n){var t=this,e=this._url+"/get-list-by-code-filter-and-type/"+l+"/"+n;return this.userService.validateOptionByToken("Enterprise:getByCodeFilterAndType").pipe(Object(o.a)(function(l){if(l)return t.http.get(e)}))},l.prototype.showByExternalReference$=function(l){var n=this,t=this._url+"/show-external-reference/"+l;return this.userService.validateOptionByToken("Enterprise:showByExternalReference").pipe(Object(o.a)(function(l){if(l)return n.http.get(t)}))},l.prototype.getByType$=function(l){var n=this,t=this._url+"/get-by-type/"+l;return this.userService.validateOptionByToken("Enterprise:getByType").pipe(Object(o.a)(function(l){if(l)return n.http.get(t)}))},l.prototype.getInfoEnterprise$=function(){var l=this,n=this._url+"/get-info-enterprise";return this.userService.validateOptionByToken("Enterprise:getInfoEnteprise").pipe(Object(o.a)(function(t){if(t)return l.http.get(n)}))},l.prototype.show$=function(l){var n=this,t=this._url+"/"+l;return this.userService.validateOptionByToken("Enterprise:show").pipe(Object(o.a)(function(l){if(l)return n.http.get(t)}))},l.prototype.showLogin$=function(l){return this.http.get(this._url+"/show-login/"+l)},l.prototype.update$=function(l){var n=this;return this.userService.validateOptionByToken("Enterprise:update").pipe(Object(o.a)(function(t){if(t)return n.http.put(n._url,l)}))},l.prototype.store$=function(l){var n=this;return this.userService.validateOptionByToken("Enterprise:create").pipe(Object(o.a)(function(t){if(t)return n.http.post(n._url,l)}))},l.prototype.delete$=function(l){var n=this,t=this._url+"/"+l.toString();return this.userService.validateOptionByToken("Enterprise:delete").pipe(Object(o.a)(function(l){if(l)return n.http.delete(t)}))},l.ngInjectableDef=r.W({factory:function(){return new l(r.ab(i.c),r.ab(u.a))},token:l,providedIn:"root"}),l}()},L6id:function(l,n,t){"use strict";t.r(n);var e=t("CcnG"),u=function(){},o=t("pMnS"),r=function(){function l(){}return l.prototype.ngOnInit=function(){},l}(),i=e.rb({encapsulation:0,styles:[['.blog-header[_ngcontent-%COMP%]{line-height:1;border-bottom:1px solid #e5e5e5}.blog-header-logo[_ngcontent-%COMP%]{font-family:"Playfair Display",Georgia,"Times New Roman",serif;font-size:2.25rem}.blog-header-logo[_ngcontent-%COMP%]:hover{text-decoration:none}h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%]{font-family:"Playfair Display",Georgia,"Times New Roman",serif}.display-4[_ngcontent-%COMP%]{font-size:2.5rem}.nav-scroller[_ngcontent-%COMP%]{position:relative;z-index:2;height:2.75rem;overflow-y:hidden}.nav-scroller[_ngcontent-%COMP%]   .nav[_ngcontent-%COMP%]{display:flex;flex-wrap:nowrap;padding-bottom:1rem;margin-top:-1px;overflow-x:auto;text-align:center;white-space:nowrap;-webkit-overflow-scrolling:touch}.nav-scroller[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%]{padding-top:.75rem;padding-bottom:.75rem;font-size:.875rem}.card-img-right[_ngcontent-%COMP%]{height:100%;border-radius:0 3px 3px 0}.flex-auto[_ngcontent-%COMP%]{flex:0 0 auto}.h-250[_ngcontent-%COMP%]{height:250px}@media (min-width:768px){.display-4[_ngcontent-%COMP%]{font-size:3rem}.h-md-250[_ngcontent-%COMP%]{height:250px}}.blog-title[_ngcontent-%COMP%]{margin-bottom:0;font-size:2rem;font-weight:400}.blog-description[_ngcontent-%COMP%]{font-size:1.1rem;color:#999}@media (min-width:40em){.blog-title[_ngcontent-%COMP%]{font-size:3.5rem}}.blog-pagination[_ngcontent-%COMP%]{margin-bottom:4rem}.blog-pagination[_ngcontent-%COMP%] > .btn[_ngcontent-%COMP%]{border-radius:2rem}.blog-post[_ngcontent-%COMP%]{margin-bottom:4rem}.blog-post-title[_ngcontent-%COMP%]{margin-bottom:.25rem;font-size:2.5rem}.blog-post-meta[_ngcontent-%COMP%]{margin-bottom:1.25rem;color:#999}.blog-footer[_ngcontent-%COMP%]{padding:2.5rem 0;color:#999;text-align:center;background-color:#f9f9f9;border-top:.05rem solid #e5e5e5}.blog-footer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:last-child{margin-bottom:0}']],data:{}});function a(l){return e.Nb(0,[(l()(),e.tb(0,0,null,null,88,"div",[["class","container-fluid"]],null,null,null,null,null)),(l()(),e.tb(1,0,null,null,4,"header",[["class","blog-header py-3"]],null,null,null,null,null)),(l()(),e.tb(2,0,null,null,3,"div",[["class","row flex-nowrap justify-content-between align-items-center"]],null,null,null,null,null)),(l()(),e.tb(3,0,null,null,2,"div",[["class","col-12 text-center"]],null,null,null,null,null)),(l()(),e.tb(4,0,null,null,1,"h2",[],null,null,null,null,null)),(l()(),e.Lb(-1,null,["Sales System"])),(l()(),e.tb(6,0,null,null,5,"div",[["class","jumbotron p-4 p-md-5 text-white rounded bg-dark"]],null,null,null,null,null)),(l()(),e.tb(7,0,null,null,4,"div",[["class","col-md-8 px-0"]],null,null,null,null,null)),(l()(),e.tb(8,0,null,null,1,"h1",[["class","display-4 font-italic"]],null,null,null,null,null)),(l()(),e.Lb(-1,null,["Sistema de gesti\xf3n y control de ventas"])),(l()(),e.tb(10,0,null,null,1,"p",[["class","lead my-3"]],null,null,null,null,null)),(l()(),e.Lb(-1,null,["SalesSystem es un software f\xe1cil y sencillo, dise\xf1ado para pymes donde puedes llevar d\xeda a d\xeda y desde cualquier lugar, la administraci\xf3n de su informaci\xf3n. El sistema ofrece soporte para los procesos de ventas, compras, inventarios, procesos productivos; incluyendo reportes contables de forma eficiente y segura."])),(l()(),e.tb(12,0,null,null,76,"div",[["class","row mb-2"]],null,null,null,null,null)),(l()(),e.tb(13,0,null,null,10,"div",[["class","col-md-6"]],null,null,null,null,null)),(l()(),e.tb(14,0,null,null,9,"div",[["class","row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"]],null,null,null,null,null)),(l()(),e.tb(15,0,null,null,6,"div",[["class","col p-4 d-flex flex-column position-static"]],null,null,null,null,null)),(l()(),e.tb(16,0,null,null,1,"strong",[["class","d-inline-block mb-2 text-primary"]],null,null,null,null,null)),(l()(),e.Lb(-1,null,["Arquitectura"])),(l()(),e.tb(18,0,null,null,1,"p",[["class","card-text mb-auto"]],null,null,null,null,null)),(l()(),e.Lb(-1,null,[" SalesSystem fue dise\xf1ado bajo un enfoque de arquitectura distribuida y orientada a web, para ofrecer el acceso a la informaci\xf3n en tiempo real y con una alta disponibilidad. "])),(l()(),e.tb(20,0,null,null,1,"p",[["class","cart-text mb-auto"]],null,null,null,null,null)),(l()(),e.Lb(-1,null,[" Se desarrollo bajo tecnolog\xedas de punta, para ofrecer una mejor experiencia de usuario, seguridad, accesibilidad y escalabilidad cuando el sistema, as\xed se requiera. "])),(l()(),e.tb(22,0,null,null,1,"div",[["class","col-auto d-none d-lg-block"]],null,null,null,null,null)),(l()(),e.tb(23,0,null,null,0,"img",[["background","#55595c"],["color","#eceeef"],["height","250"],["src","assets/images/arquitectura.png"],["text","Thumbnail"],["width","200"]],null,null,null,null,null)),(l()(),e.tb(24,0,null,null,8,"div",[["class","col-md-6"]],null,null,null,null,null)),(l()(),e.tb(25,0,null,null,7,"div",[["class","row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"]],null,null,null,null,null)),(l()(),e.tb(26,0,null,null,4,"div",[["class","col p-4 d-flex flex-column position-static"]],null,null,null,null,null)),(l()(),e.tb(27,0,null,null,1,"strong",[["class","d-inline-block mb-2 text-success"]],null,null,null,null,null)),(l()(),e.Lb(-1,null,["Tecnolog\xeda"])),(l()(),e.tb(29,0,null,null,1,"p",[["class","mb-auto"]],null,null,null,null,null)),(l()(),e.Lb(-1,null,[" Para la construcci\xf3n del sistema se eligi\xf3 para desarrollo de la capa de presentaci\xf3n a AngularJS versi\xf3n 6 y para la l\xf3gica de negocio se escogi\xf3 a PHP-Laravel versi\xf3n 5.1, y se exponen recursos REST para dar accesibilidad a m\xfaltiples clientes. "])),(l()(),e.tb(31,0,null,null,1,"div",[["class","col-auto d-none d-lg-block"]],null,null,null,null,null)),(l()(),e.tb(32,0,null,null,0,"img",[["background","#55595c"],["color","#eceeef"],["height","250"],["src","assets/images/tecnologia.png"],["text","Thumbnail"],["width","200"]],null,null,null,null,null)),(l()(),e.tb(33,0,null,null,55,"main",[["class","container-fluid"],["role","main"]],null,null,null,null,null)),(l()(),e.tb(34,0,null,null,54,"div",[["class","row"]],null,null,null,null,null)),(l()(),e.tb(35,0,null,null,47,"div",[["class","col-md-8 blog-main"]],null,null,null,null,null)),(l()(),e.tb(36,0,null,null,1,"h3",[["class","pb-4 mb-4 font-italic border-bottom"]],null,null,null,null,null)),(l()(),e.Lb(-1,null,[" M\xf3dulos del sistema "])),(l()(),e.tb(38,0,null,null,4,"div",[["class","blog-post"]],null,null,null,null,null)),(l()(),e.tb(39,0,null,null,1,"h2",[["class","blog-post-title"]],null,null,null,null,null)),(l()(),e.Lb(-1,null,["Compras"])),(l()(),e.tb(41,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),e.Lb(-1,null,["El m\xf3dulo de compras permite una gesti\xf3n organizada de todas las compras realizadas por la empresa, permite llevar un control sobre las compras por per\xedodo de tiempo, cuentas por pagar, estado de cuenta por proveedor, tiempo de recaudo de facturas, entre otras funcionalidades."])),(l()(),e.tb(43,0,null,null,4,"div",[["class","blog-post"]],null,null,null,null,null)),(l()(),e.tb(44,0,null,null,1,"h2",[["class","blog-post-title"]],null,null,null,null,null)),(l()(),e.Lb(-1,null,["Ventas"])),(l()(),e.tb(46,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),e.Lb(-1,null,["El m\xf3dulo de ventas permite una gesti\xf3n organizada de todas las facturas generadas, permite llevar un control sobre las ventas por per\xedodo de tiempo, cuentas por cobrar, estado de cuenta por clientes, tiempo de recaudo de facturas, entre otras funcionalidades."])),(l()(),e.tb(48,0,null,null,4,"div",[["class","blog-post"]],null,null,null,null,null)),(l()(),e.tb(49,0,null,null,1,"h2",[["class","blog-post-title"]],null,null,null,null,null)),(l()(),e.Lb(-1,null,["Inventarios"])),(l()(),e.tb(51,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),e.Lb(-1,null,["El m\xf3dulo de inventarios gestiona la informaci\xf3n de todos los productos que se puedan comercializar, ya sean; productos comprados a terceros o producidos por la empresa. Igualmente permite llevar un control de inventarios, generaci\xf3n de c\xf3digo de barras propios y reportes de productos."])),(l()(),e.tb(53,0,null,null,4,"div",[["class","blog-post"]],null,null,null,null,null)),(l()(),e.tb(54,0,null,null,1,"h2",[["class","blog-post-title"]],null,null,null,null,null)),(l()(),e.Lb(-1,null,["Recurso Humano"])),(l()(),e.tb(56,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),e.Lb(-1,null,["M\xf3dulo que permite llevar un registro sobre todas las personas que tienen alg\xfan v\xednculo con la empresa, pueden ser clientes o trabajadores, para los trabajadores, permite llevar un registro sobre contrataci\xf3n, novedades de n\xf3mina, pago de salario, entre otras funcionalidades."])),(l()(),e.tb(58,0,null,null,4,"div",[["class","blog-post"]],null,null,null,null,null)),(l()(),e.tb(59,0,null,null,1,"h2",[["class","blog-post-title"]],null,null,null,null,null)),(l()(),e.Lb(-1,null,["Procesos de producci\xf3n"])),(l()(),e.tb(61,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),e.Lb(-1,null,["Este m\xf3dulo, permite llevar un control sobre los productos que produce la empresa para comercializar, llevando un control sobre los insumos necesarios en cada proceso productivo, dividiendo el proceso en per\xedodos de corte para un mayor control sobre los productos, tanto resultantes como insumos utilizados en cada per\xedodo."])),(l()(),e.tb(63,0,null,null,4,"div",[["class","blog-post"]],null,null,null,null,null)),(l()(),e.tb(64,0,null,null,1,"h2",[["class","blog-post-title"]],null,null,null,null,null)),(l()(),e.Lb(-1,null,["Liquidaci\xf3n"])),(l()(),e.tb(66,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),e.Lb(-1,null,["M\xf3dulo que permite llevar un control sobre las liquidaciones realizadas dado un per\xedodo, para cada trabajador de la empresa, el sistema permite generar pagos por unidad productiva o salario fijo."])),(l()(),e.tb(68,0,null,null,4,"div",[["class","blog-post"]],null,null,null,null,null)),(l()(),e.tb(69,0,null,null,1,"h2",[["class","blog-post-title"]],null,null,null,null,null)),(l()(),e.Lb(-1,null,["Egresos"])),(l()(),e.tb(71,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),e.Lb(-1,null,["M\xf3dulo que gestiona los gastos realizados por la empresa dia a dia, permite llevar una num\xe9raci\xf3n consecutiva y/o facturas equivalentes."])),(l()(),e.tb(73,0,null,null,4,"div",[["class","blog-post"]],null,null,null,null,null)),(l()(),e.tb(74,0,null,null,1,"h2",[["class","blog-post-title"]],null,null,null,null,null)),(l()(),e.Lb(-1,null,["Empresas"])),(l()(),e.tb(76,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),e.Lb(-1,null,["En el m\xf3dulo de empresas, se lleva un control sobre todas las empresas proveedoras con las que la empresa tiene alguna relaci\xf3n, permitiendo hacer un seguimiento hist\xf3rico de compras y cuentas por pagar."])),(l()(),e.tb(78,0,null,null,4,"div",[["class","blog-post"]],null,null,null,null,null)),(l()(),e.tb(79,0,null,null,1,"h2",[["class","blog-post-title"]],null,null,null,null,null)),(l()(),e.Lb(-1,null,["Administraci\xf3n y gesti\xf3n de acceso"])),(l()(),e.tb(81,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),e.Lb(-1,null,["Toda la administraci\xf3n de usuarios, roles y permisos para usuarios, se realiza en \xe9ste m\xf3dulo. Se garantiza la seguridad de la informaci\xf3n contenida en el sistema, dado que implementa un sistema de acceso por token bajo encriptaci\xf3n SSH con algoritmo de cifrado SHA156. Se configura un tiempo de expiraci\xf3n del token para renovar accesos y validar seguridad."])),(l()(),e.tb(83,0,null,null,5,"aside",[["class","col-md-4 blog-sidebar"]],null,null,null,null,null)),(l()(),e.tb(84,0,null,null,4,"div",[["class","p-4 mb-3 bg-light rounded"]],null,null,null,null,null)),(l()(),e.tb(85,0,null,null,1,"h4",[["class","font-italic"]],null,null,null,null,null)),(l()(),e.Lb(-1,null,["Noticias destacadas"])),(l()(),e.tb(87,0,null,null,1,"p",[["class","mb-0"]],null,null,null,null,null)),(l()(),e.Lb(-1,null,["En esta secci\xf3n se muestran las publicaciones destacadas de la semana."]))],null,null)}var s=t("Ip0R"),c=t("gIcY"),p=t("syPK"),d=t("Fe25"),b=t("dY7N"),g=t("LfDE"),m=t("kmKP"),f=t("NlNA"),h=t("TTF2"),v=function(){},y=t("xMyE"),B=t("I1QV"),C=t("Bmgd"),O=t("9DKF"),S=t("g9N7"),_=function(){function l(l,n,t,e,u,o,r,i,a,s){this.fb=l,this.formToolService=n,this.userService=t,this.globalStoreService=e,this.router=u,this.personService=o,this.authenticationService=r,this.enterPriseService=i,this.rolService=a,this.accessEnterpriseService=s,this.userLogin=new f.a,this.success=!0,this.code="",this.description="",this.user$=this.globalStoreService.getUser$()}return l.prototype.ngOnInit=function(){this.initForm()},l.prototype.initForm=function(){this.authenticationForm=this.fb.group({username:["",c.t.required],token:[""],password:["",[c.t.required,c.t.minLength(3)]]})},l.prototype.onLogin=function(){var l=this;this.userService.sendCredential$(this.authenticationForm.value).pipe(Object(y.a)(function(n){l.userLogin=n}),Object(y.a)(function(n){l.rolService.showLogin$(n.fk_id_rol).subscribe(function(n){return l.userLogin.rol=n})}),Object(y.a)(function(n){l.accessEnterpriseService.getAccessByEnterpriseLogin$(n.fk_id_enterprise).subscribe(function(n){return l.userLogin.access_enterprise=n})}),Object(y.a)(function(n){l.personService.showLogin$(n.fk_id_person).subscribe(function(n){return l.userLogin.person=n})}),Object(y.a)(function(n){l.enterPriseService.showLogin$(n.fk_id_enterprise).subscribe(function(n){return l.userLogin.enterprise=n})}),Object(y.a)(function(n){l.globalStoreService.setUser(n)}),Object(y.a)(function(n){var t=new v;t.api_token=n.api_token,t.username=n.username,l.authenticationService.storeSales$(t).subscribe()}),Object(y.a)(function(n){var t=new v;t.api_token=n.api_token,t.username=n.username,l.authenticationService.storeCredits$(t).subscribe()})).subscribe(function(){return l.router.navigateByUrl("/sales-admin/modules")},function(n){l.success=!1,l.code=n.error.code,l.description=n.error.message,l.initForm()})},l.prototype.getErrors=function(l){return this.formToolService.getErrors(this.authenticationForm,l)},l.prototype.mustShowError=function(l){return this.formToolService.mustShowError(this.authenticationForm,l)},l.prototype.hasError=function(l,n){return this.formToolService.hasError(this.authenticationForm,l,n)},l}(),k=t("ZYCi"),w=e.rb({encapsulation:2,styles:[],data:{}});function P(l){return e.Nb(0,[(l()(),e.tb(0,0,null,null,5,"div",[["class","row alert alert-danger"]],null,null,null,null,null)),(l()(),e.tb(1,0,null,null,4,"div",[["class","col-sm-12"]],null,null,null,null,null)),(l()(),e.tb(2,0,null,null,1,"h6",[],null,null,null,null,null)),(l()(),e.Lb(3,null,["",""])),(l()(),e.tb(4,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),e.Lb(5,null,["",""]))],null,function(l,n){var t=n.component;l(n,3,0,t.code),l(n,5,0,t.description)})}function E(l){return e.Nb(0,[(l()(),e.tb(0,0,null,null,1,"small",[["class","form-text alert-danger"]],null,null,null,null,null)),(l()(),e.Lb(-1,null,[" Nombre es obligatorio "]))],null,null)}function L(l){return e.Nb(0,[(l()(),e.tb(0,0,null,null,1,"small",[["class","form-text alert-danger"]],null,null,null,null,null)),(l()(),e.Lb(-1,null,[" Contrase\xf1a es obligatorio "]))],null,null)}function D(l){return e.Nb(0,[(l()(),e.tb(0,0,null,null,1,"small",[["class","form-text alert-danger"]],null,null,null,null,null)),(l()(),e.Lb(1,null,[" La contrase\xf1a debe contener al menos "," digitos "]))],null,function(l,n){l(n,1,0,n.component.getErrors("password").minlength.requiredLength)})}function x(l){return e.Nb(0,[(l()(),e.tb(0,0,null,null,4,"span",[],null,null,null,null,null)),(l()(),e.kb(16777216,null,null,1,null,L)),e.sb(2,16384,null,0,s.o,[e.S,e.P],{ngIf:[0,"ngIf"]},null),(l()(),e.kb(16777216,null,null,1,null,D)),e.sb(4,16384,null,0,s.o,[e.S,e.P],{ngIf:[0,"ngIf"]},null)],function(l,n){var t=n.component;l(n,2,0,t.hasError("password","required")),l(n,4,0,t.hasError("password","minlength"))},null)}function T(l){return e.Nb(0,[(l()(),e.tb(0,0,null,null,8,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),e.tb(1,0,null,null,1,"label",[["for","token"]],null,null,null,null,null)),(l()(),e.Lb(-1,null,["Token de acceso"])),(l()(),e.tb(3,0,null,null,5,"input",[["class","form-control text-small"],["formControlName","token"],["placeholder","TOKEN de acceso"],["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,t){var u=!0;return"input"===n&&(u=!1!==e.Db(l,4)._handleInput(t.target.value)&&u),"blur"===n&&(u=!1!==e.Db(l,4).onTouched()&&u),"compositionstart"===n&&(u=!1!==e.Db(l,4)._compositionStart()&&u),"compositionend"===n&&(u=!1!==e.Db(l,4)._compositionEnd(t.target.value)&&u),u},null,null)),e.sb(4,16384,null,0,c.e,[e.G,e.l,[2,c.a]],null,null),e.Ib(1024,null,c.l,function(l){return[l]},[c.e]),e.sb(6,671744,null,0,c.h,[[3,c.d],[8,null],[8,null],[6,c.l],[2,c.y]],{name:[0,"name"]},null),e.Ib(2048,null,c.m,null,[c.h]),e.sb(8,16384,null,0,c.n,[[4,c.m]],null,null)],function(l,n){l(n,6,0,"token")},function(l,n){l(n,3,0,e.Db(n,8).ngClassUntouched,e.Db(n,8).ngClassTouched,e.Db(n,8).ngClassPristine,e.Db(n,8).ngClassDirty,e.Db(n,8).ngClassValid,e.Db(n,8).ngClassInvalid,e.Db(n,8).ngClassPending)})}function j(l){return e.Nb(0,[(l()(),e.tb(0,0,null,null,42,"app-card",[["caption","Autenticaci\xf3n"]],null,null,null,p.b,p.a)),e.sb(1,114688,null,0,d.a,[],{caption:[0,"caption"]},null),(l()(),e.tb(2,0,null,0,37,"main",[],null,null,null,null,null)),(l()(),e.kb(16777216,null,null,1,null,P)),e.sb(4,16384,null,0,s.o,[e.S,e.P],{ngIf:[0,"ngIf"]},null),(l()(),e.tb(5,0,null,null,34,"div",[["class","row"]],null,null,null,null,null)),(l()(),e.tb(6,0,null,null,33,"div",[["class","col-sm-12"]],null,null,null,null,null)),(l()(),e.tb(7,0,null,null,32,"form",[["novalidate",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"submit"],[null,"reset"]],function(l,n,t){var u=!0;return"submit"===n&&(u=!1!==e.Db(l,9).onSubmit(t)&&u),"reset"===n&&(u=!1!==e.Db(l,9).onReset()&&u),u},null,null)),e.sb(8,16384,null,0,c.w,[],null,null),e.sb(9,540672,null,0,c.i,[[8,null],[8,null]],{form:[0,"form"]},null),e.Ib(2048,null,c.d,null,[c.i]),e.sb(11,16384,null,0,c.o,[[4,c.d]],null,null),(l()(),e.tb(12,0,null,null,12,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),e.tb(13,0,null,null,1,"label",[["for","username"]],null,null,null,null,null)),(l()(),e.Lb(-1,null,["Nombre de Usuario"])),(l()(),e.tb(15,0,null,null,7,"input",[["class","form-control text-small"],["formControlName","username"],["placeholder","Nombre de usuario"],["required",""],["type","text"]],[[1,"required",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,t){var u=!0;return"input"===n&&(u=!1!==e.Db(l,16)._handleInput(t.target.value)&&u),"blur"===n&&(u=!1!==e.Db(l,16).onTouched()&&u),"compositionstart"===n&&(u=!1!==e.Db(l,16)._compositionStart()&&u),"compositionend"===n&&(u=!1!==e.Db(l,16)._compositionEnd(t.target.value)&&u),u},null,null)),e.sb(16,16384,null,0,c.e,[e.G,e.l,[2,c.a]],null,null),e.sb(17,16384,null,0,c.r,[],{required:[0,"required"]},null),e.Ib(1024,null,c.k,function(l){return[l]},[c.r]),e.Ib(1024,null,c.l,function(l){return[l]},[c.e]),e.sb(20,671744,null,0,c.h,[[3,c.d],[6,c.k],[8,null],[6,c.l],[2,c.y]],{name:[0,"name"]},null),e.Ib(2048,null,c.m,null,[c.h]),e.sb(22,16384,null,0,c.n,[[4,c.m]],null,null),(l()(),e.kb(16777216,null,null,1,null,E)),e.sb(24,16384,null,0,s.o,[e.S,e.P],{ngIf:[0,"ngIf"]},null),(l()(),e.tb(25,0,null,null,12,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),e.tb(26,0,null,null,1,"label",[["for","password"]],null,null,null,null,null)),(l()(),e.Lb(-1,null,["Contrase\xf1a"])),(l()(),e.tb(28,0,null,null,7,"input",[["class","form-control text-small"],["formControlName","password"],["placeholder","Contrase\xf1a"],["required",""],["type","password"]],[[1,"required",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,t){var u=!0;return"input"===n&&(u=!1!==e.Db(l,29)._handleInput(t.target.value)&&u),"blur"===n&&(u=!1!==e.Db(l,29).onTouched()&&u),"compositionstart"===n&&(u=!1!==e.Db(l,29)._compositionStart()&&u),"compositionend"===n&&(u=!1!==e.Db(l,29)._compositionEnd(t.target.value)&&u),u},null,null)),e.sb(29,16384,null,0,c.e,[e.G,e.l,[2,c.a]],null,null),e.sb(30,16384,null,0,c.r,[],{required:[0,"required"]},null),e.Ib(1024,null,c.k,function(l){return[l]},[c.r]),e.Ib(1024,null,c.l,function(l){return[l]},[c.e]),e.sb(33,671744,null,0,c.h,[[3,c.d],[6,c.k],[8,null],[6,c.l],[2,c.y]],{name:[0,"name"]},null),e.Ib(2048,null,c.m,null,[c.h]),e.sb(35,16384,null,0,c.n,[[4,c.m]],null,null),(l()(),e.kb(16777216,null,null,1,null,x)),e.sb(37,16384,null,0,s.o,[e.S,e.P],{ngIf:[0,"ngIf"]},null),(l()(),e.kb(16777216,null,null,1,null,T)),e.sb(39,16384,null,0,s.o,[e.S,e.P],{ngIf:[0,"ngIf"]},null),(l()(),e.tb(40,0,null,1,2,"footer",[],null,null,null,null,null)),(l()(),e.tb(41,0,null,null,1,"button",[["class","btn btn-primary btn-sm"],["type","submit"]],[[8,"disabled",0]],[[null,"click"]],function(l,n,t){var e=!0;return"click"===n&&(e=!1!==l.component.onLogin()&&e),e},null,null)),(l()(),e.Lb(-1,null,["Entrar"]))],function(l,n){var t=n.component;l(n,1,0,"Autenticaci\xf3n"),l(n,4,0,!t.success),l(n,9,0,t.authenticationForm),l(n,17,0,""),l(n,20,0,"username"),l(n,24,0,t.mustShowError("username")),l(n,30,0,""),l(n,33,0,"password"),l(n,37,0,t.mustShowError("password")),l(n,39,0,"303"==t.code)},function(l,n){var t=n.component;l(n,7,0,e.Db(n,11).ngClassUntouched,e.Db(n,11).ngClassTouched,e.Db(n,11).ngClassPristine,e.Db(n,11).ngClassDirty,e.Db(n,11).ngClassValid,e.Db(n,11).ngClassInvalid,e.Db(n,11).ngClassPending),l(n,15,0,e.Db(n,17).required?"":null,e.Db(n,22).ngClassUntouched,e.Db(n,22).ngClassTouched,e.Db(n,22).ngClassPristine,e.Db(n,22).ngClassDirty,e.Db(n,22).ngClassValid,e.Db(n,22).ngClassInvalid,e.Db(n,22).ngClassPending),l(n,28,0,e.Db(n,30).required?"":null,e.Db(n,35).ngClassUntouched,e.Db(n,35).ngClassTouched,e.Db(n,35).ngClassPristine,e.Db(n,35).ngClassDirty,e.Db(n,35).ngClassValid,e.Db(n,35).ngClassInvalid,e.Db(n,35).ngClassPending),l(n,41,0,t.authenticationForm.invalid)})}var M=e.pb("app-login",_,function(l){return e.Nb(0,[(l()(),e.tb(0,0,null,null,1,"app-login",[],null,null,null,j,w)),e.sb(1,114688,null,0,_,[c.g,b.a,m.a,g.a,k.k,B.a,h.a,C.a,O.a,S.a],null,null)],function(l,n){l(n,1,0)},null)},{},{},[]),q=function(){function l(){}return l.prototype.ngOnInit=function(){},l}(),I=e.rb({encapsulation:2,styles:[],data:{}});function N(l){return e.Nb(0,[(l()(),e.tb(0,0,null,null,6,"div",[["class","row"]],null,null,null,null,null)),(l()(),e.tb(1,0,null,null,2,"div",[["class","col-sm-9"]],null,null,null,null,null)),(l()(),e.tb(2,0,null,null,1,"app-main-page",[],null,null,null,a,i)),e.sb(3,114688,null,0,r,[],null,null),(l()(),e.tb(4,0,null,null,2,"div",[["class","col-sm-3"]],null,null,null,null,null)),(l()(),e.tb(5,0,null,null,1,"app-login",[],null,null,null,j,w)),e.sb(6,114688,null,0,_,[c.g,b.a,m.a,g.a,k.k,B.a,h.a,C.a,O.a,S.a],null,null)],function(l,n){l(n,3,0),l(n,6,0)},null)}var $=e.pb("app-home",q,function(l){return e.Nb(0,[(l()(),e.tb(0,0,null,null,1,"app-home",[],null,null,null,N,I)),e.sb(1,114688,null,0,q,[],null,null)],function(l,n){l(n,1,0)},null)},{},{},[]),F=t("t/Na"),z=t("M2Lx"),A=t("eDkP"),U=t("Fzqc"),R=t("mVsa"),K=t("lLAP"),J=t("dWZg"),V=t("OBdK"),G=function(){},H=t("PCNd"),Y=function(){},W=t("Wf4p"),X=t("UodH"),Q=t("de3e"),Z=t("FVSy"),ll=t("seP3"),nl=t("8mMr"),tl=t("qAlS"),el=t("Nsh5"),ul=t("LC5p"),ol=t("0/Q6"),rl=t("SMsm"),il=t("4c35"),al=t("J12g"),sl=t("La40"),cl=t("vvyD"),pl=function(){};t.d(n,"HomeModuleNgFactory",function(){return dl});var dl=e.qb(u,[],function(l){return e.Ab([e.Bb(512,e.k,e.fb,[[8,[o.a,$,M]],[3,e.k],e.z]),e.Bb(4608,s.q,s.p,[e.w,[2,s.z]]),e.Bb(4608,c.g,c.g,[]),e.Bb(4608,c.x,c.x,[]),e.Bb(4608,b.a,b.a,[]),e.Bb(4608,F.m,F.m,[]),e.Bb(6144,F.k,null,[F.m]),e.Bb(4608,F.i,F.i,[F.k]),e.Bb(6144,F.b,null,[F.i]),e.Bb(4608,F.g,F.l,[F.b,e.s]),e.Bb(4608,F.c,F.c,[F.g]),e.Bb(4608,m.a,m.a,[F.c]),e.Bb(4608,z.a,z.a,[]),e.Bb(4608,A.b,A.b,[A.h,A.d,e.k,A.g,A.e,e.s,e.B,s.d,U.b]),e.Bb(5120,A.i,A.j,[A.b]),e.Bb(5120,R.a,R.c,[A.b]),e.Bb(135680,K.e,K.e,[e.B,J.a]),e.Bb(4608,V.e,V.e,[e.P]),e.Bb(4608,F.j,F.p,[s.d,e.D,F.n]),e.Bb(4608,F.q,F.q,[F.j,F.o]),e.Bb(5120,F.a,function(l){return[l]},[F.q]),e.Bb(4608,h.a,h.a,[F.c]),e.Bb(4608,B.a,B.a,[F.c,m.a]),e.Bb(4608,C.a,C.a,[F.c,m.a]),e.Bb(4608,O.a,O.a,[F.c,m.a]),e.Bb(4608,S.a,S.a,[F.c,m.a]),e.Bb(1073742336,s.c,s.c,[]),e.Bb(1073742336,k.n,k.n,[[2,k.t],[2,k.k]]),e.Bb(1073742336,G,G,[]),e.Bb(1073742336,c.u,c.u,[]),e.Bb(1073742336,c.q,c.q,[]),e.Bb(1073742336,H.a,H.a,[]),e.Bb(1073742336,Y,Y,[]),e.Bb(1073742336,U.a,U.a,[]),e.Bb(1073742336,W.b,W.b,[[2,W.a]]),e.Bb(1073742336,J.b,J.b,[]),e.Bb(1073742336,W.f,W.f,[]),e.Bb(1073742336,X.a,X.a,[]),e.Bb(1073742336,z.b,z.b,[]),e.Bb(1073742336,Q.a,Q.a,[]),e.Bb(1073742336,Z.a,Z.a,[]),e.Bb(1073742336,ll.a,ll.a,[]),e.Bb(1073742336,nl.a,nl.a,[]),e.Bb(1073742336,tl.a,tl.a,[]),e.Bb(1073742336,el.a,el.a,[]),e.Bb(1073742336,W.c,W.c,[]),e.Bb(1073742336,W.e,W.e,[]),e.Bb(1073742336,ul.a,ul.a,[]),e.Bb(1073742336,ol.a,ol.a,[]),e.Bb(1073742336,rl.a,rl.a,[]),e.Bb(1073742336,il.g,il.g,[]),e.Bb(1073742336,A.f,A.f,[]),e.Bb(1073742336,R.b,R.b,[]),e.Bb(1073742336,V.c,V.c,[]),e.Bb(1073742336,al.a,al.a,[]),e.Bb(1073742336,K.a,K.a,[]),e.Bb(1073742336,sl.a,sl.a,[]),e.Bb(1073742336,cl.a,cl.a,[]),e.Bb(1073742336,F.e,F.e,[]),e.Bb(1073742336,F.d,F.d,[]),e.Bb(1073742336,pl,pl,[]),e.Bb(1073742336,u,u,[]),e.Bb(1024,k.i,function(){return[[{path:"",component:q}],[{path:"",component:_}]]},[]),e.Bb(256,F.n,"XSRF-TOKEN",[]),e.Bb(256,F.o,"X-XSRF-TOKEN",[])])})},PCNd:function(l,n,t){"use strict";t.d(n,"a",function(){return e});var e=function(){}},dY7N:function(l,n,t){"use strict";t.d(n,"a",function(){return e});var e=function(){function l(){this.getControl=function(l,n){return l.controls[n]},this.getControlChild=function(l,n,t){return l.controls[n].controls[t]}}return l.prototype.getErrors=function(l,n){return this.getControl(l,n).errors},l.prototype.getErrorsChild=function(l,n,t){return this.getControlChild(l,n,t).errors},l.prototype.mustShowError=function(l,n){var t=this.getControl(l,n);return!(!t.invalid||!t.dirty&&!t.touched)},l.prototype.mustShowErrorChild=function(l,n,t){var e=this.getControlChild(l,n,t);return!(!e.invalid||!e.dirty&&!e.touched)},l.prototype.hasError=function(l,n,t){return!!this.getControl(l,n).getError(t)},l.prototype.hasErrorChild=function(l,n,t,e){return!!this.getControlChild(l,n,t).getError(e)},l}()},kmKP:function(l,n,t){"use strict";t.d(n,"a",function(){return o});var e=t("AytR"),u=t("15JJ"),o=function(){function l(l){this.http=l,this._url=e.a.url_user}return l.prototype.sendCredential$=function(l){return this.http.post(this._url+"/login",l)},l.prototype.validateOptionByToken=function(l){return this.http.get(this._url+"/validate-option-by-token-and-code-option/"+l)},l.prototype.getAll$=function(){var l=this;return this.validateOptionByToken("User:getAll").pipe(Object(u.a)(function(n){if(n)return l.http.get(l._url)}))},l.prototype.getUserByEnteprise$=function(l){var n=this,t=this._url+"/get-by-enterprise/"+l;return this.validateOptionByToken("User:getByEnterprise").pipe(Object(u.a)(function(l){if(l)return n.http.get(t)}))},l.prototype.show$=function(l){var n=this,t=this._url+"/"+l.toString();return this.validateOptionByToken("User:show").pipe(Object(u.a)(function(l){if(l)return n.http.get(t)}))},l.prototype.store$=function(l){var n=this;return this.validateOptionByToken("User:create").pipe(Object(u.a)(function(t){if(t)return n.http.post(n._url,l)}))},l.prototype.delete$=function(l){var n=this,t=this._url+"/"+l.toString();return this.validateOptionByToken("User:delete").pipe(Object(u.a)(function(l){if(l)return n.http.delete(t)}))},l.prototype.update$=function(l){var n=this;return this.validateOptionByToken("User:update").pipe(Object(u.a)(function(t){if(t)return n.http.put(n._url,l)}))},l.prototype.inactiveUserByPerson$=function(l){var n=this,t=this._url+"/inactive-user-by-person/"+l.toString();return this.validateOptionByToken("User:inactiveByPerson").pipe(Object(u.a)(function(l){if(l)return n.http.get(t)}))},l}()}}]);