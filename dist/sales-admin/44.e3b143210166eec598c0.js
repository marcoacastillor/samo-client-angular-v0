(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{bE4C:function(l,n,u){"use strict";u.d(n,"a",function(){return t});var t=function(){}},mB2O:function(l,n,u){"use strict";u.d(n,"a",function(){return i});var t=u("AytR"),e=u("kmKP"),r=u("15JJ"),a=u("CcnG"),o=u("t/Na"),i=function(){function l(l,n){this.http=l,this.userService=n,this._url=t.a.url_products}return l.prototype.getAll$=function(){var l=this;return this.userService.validateOptionByToken("Product:getAll").pipe(Object(r.a)(function(n){if(n)return l.http.get(l._url)}))},l.prototype.getValueStock$=function(){var l=this,n=this._url+"/get-value-stock";return this.userService.validateOptionByToken("Product:getValueStock").pipe(Object(r.a)(function(u){if(u)return l.http.get(n)}))},l.prototype.show$=function(l){var n=this,u=this._url+"/"+l;return this.userService.validateOptionByToken("Product:show").pipe(Object(r.a)(function(l){if(l)return n.http.get(u)}))},l.prototype.update$=function(l){var n=this;return this.userService.validateOptionByToken("Product:update").pipe(Object(r.a)(function(u){if(u)return n.http.put(n._url,l)}))},l.prototype.delete$=function(l){var n=this,u=this._url+"/"+l;return this.userService.validateOptionByToken("Product:delete").pipe(Object(r.a)(function(l){if(l)return n.http.delete(u)}))},l.prototype.getTopSoldProducts$=function(l,n){var u=this,t=this._url+"/get-top-sold-products/"+l+"/"+n;return this.userService.validateOptionByToken("Product:getTopSoldProducts").pipe(Object(r.a)(function(l){if(l)return u.http.get(t)}))},l.prototype.searchByFilter$=function(l){var n=this,u=this._url+"/get-by-filter";return this.userService.validateOptionByToken("Product:getByFilter").pipe(Object(r.a)(function(t){if(t)return n.http.post(u,l)}))},l.prototype.getByCode$=function(l,n){var u=this,t=this._url+"/get-by-code-and-type/"+l+"/"+n;return this.userService.validateOptionByToken("Product:getByCodeAndType").pipe(Object(r.a)(function(l){if(l)return u.http.get(t)}))},l.prototype.getSalesProductsByCodeFilter$=function(l){var n=this,u=this._url+"/get-sales-products-by-code-filter/"+l;return this.userService.validateOptionByToken("Product:getSalesProductByCodeFilter").pipe(Object(r.a)(function(l){if(l)return n.http.get(u)}))},l.prototype.getSalesProductsByNameFilter$=function(l){var n=this,u=this._url+"/get-sales-products-by-name-filter/"+l;return this.userService.validateOptionByToken("Product:getSalesProductByNameFilter").pipe(Object(r.a)(function(l){if(l)return n.http.get(u)}))},l.prototype.getNotSalesProductsByNameFilter$=function(l){var n=this,u=this._url+"/get-not-sales-products-by-name-filter/"+l;return this.userService.validateOptionByToken("Product:getNotSalesProductsByNameFilter").pipe(Object(r.a)(function(l){if(l)return n.http.get(u)}))},l.prototype.getPaymentsProductsByNameFilter$=function(l){var n=this,u=this._url+"/get-payments-products-by-name-filter/"+l;return this.userService.validateOptionByToken("Product:getPaymentsProductsByNameFilter").pipe(Object(r.a)(function(l){if(l)return n.http.get(u)}))},l.prototype.getByCodeFilterAndType$=function(l){var n=this,u=this._url+"/get-by-code-filter-and-type/"+l;return this.userService.validateOptionByToken("Product:getByCodeFilterAndType").pipe(Object(r.a)(function(l){if(l)return n.http.get(u)}))},l.prototype.getByNameFilterAndType$=function(l){var n=this,u=this._url+"/get-by-name-filter-and-type/"+l;return this.userService.validateOptionByToken("Product:getByNameFilterAndType").pipe(Object(r.a)(function(l){if(l)return n.http.get(u)}))},l.prototype.getByCodeFilterAndTypeINProduction$=function(l){var n=this,u=this._url+"/get-by-code-filter-and-type-inproduction/"+l;return this.userService.validateOptionByToken("Product:getByCodeFilterAndTypeINProduction").pipe(Object(r.a)(function(l){if(l)return n.http.get(u)}))},l.prototype.getByNameFilterAndTypeINProduction$=function(l){var n=this,u=this._url+"/get-by-name-filter-and-type-inproduction/"+l;return this.userService.validateOptionByToken("Product:getByNameFilterAndTypeINProduction").pipe(Object(r.a)(function(l){if(l)return n.http.get(u)}))},l.prototype.store$=function(l){var n=this;return this.userService.validateOptionByToken("Product:create").pipe(Object(r.a)(function(u){if(u)return n.http.post(n._url,l)}))},l.prototype.getByType$=function(l){var n=this,u=this._url+"/get-by-type/"+l;return this.userService.validateOptionByToken("Product:getByType").pipe(Object(r.a)(function(l){if(l)return n.http.get(u)}))},l.prototype.getAllByEnterprise$=function(l){var n=this,u=this._url+"/get-all-by-enterprise/"+l.toString();return this.userService.validateOptionByToken("Product:getAllByEnterprise").pipe(Object(r.a)(function(l){if(l)return n.http.get(u)}))},l.prototype.getByCodeFilterAndEnterprise$=function(l,n){var u=this,t=this._url+"/get-all-by-codeFilter-and-enterprise/"+l+"/"+n.toString();return this.userService.validateOptionByToken("Product:getAllByCodeFilterAndEnterprise").pipe(Object(r.a)(function(l){if(l)return u.http.get(t)}))},l.prototype.getByNameFilterAndEnterprise$=function(l,n){var u=this,t=this._url+"/get-all-by-nameFilter-and-enterprise/"+l+"/"+n.toString();return this.userService.validateOptionByToken("Product:getAllByNameFilterAndEnterprise").pipe(Object(r.a)(function(l){if(l)return u.http.get(t)}))},l.prototype.getByReferenceFilterAndEnterprise$=function(l,n){var u=this,t=this._url+"/get-all-by-referenceFilter-and-enterprise/"+l+"/"+n.toString();return this.userService.validateOptionByToken("Product:getAllbyReferenceFilterAndEnterprise").pipe(Object(r.a)(function(l){if(l)return u.http.get(t)}))},l.prototype.getConsecutiveProductByEnterprise=function(l){var n=this,u=this._url+"/get-consecurive-by-enterprise/"+l.toString();return this.userService.validateOptionByToken("Product:getConsecutiveByEnterprise").pipe(Object(r.a)(function(l){if(l)return n.http.get(u)}))},l.ngInjectableDef=a.W({factory:function(){return new l(a.ab(o.c),a.ab(e.a))},token:l,providedIn:"root"}),l}()},os84:function(l,n,u){"use strict";u.r(n);var t=u("CcnG"),e=function(){},r=u("pMnS"),a=u("yp8b"),o=u("fnSY"),i=u("ZYCi"),s=u("Ip0R"),c=u("fNgX"),b=u("Hf/j"),d=u("ZYjt"),p=u("wHSu"),g=function(){function l(){this.faAngleDoubleRight=p.c}return l.prototype.ngOnInit=function(){},l}(),m=t.rb({encapsulation:2,styles:[],data:{}});function f(l){return t.Nb(0,[(l()(),t.tb(0,0,null,null,22,"app-pages",[["title","Reportes de producto"]],null,null,null,a.b,a.a)),t.sb(1,114688,null,0,o.a,[],{title:[0,"title"]},null),(l()(),t.tb(2,0,null,0,20,"main",[],null,null,null,null,null)),(l()(),t.tb(3,0,null,null,19,"section",[],null,null,null,null,null)),(l()(),t.tb(4,0,null,null,2,"div",[["class","row bg-gray"]],null,null,null,null,null)),(l()(),t.tb(5,0,null,null,1,"div",[["class","col-sm-12 text-left"]],null,null,null,null,null)),(l()(),t.Lb(-1,null,[" Reportes de productos e inventarios "])),(l()(),t.tb(7,0,null,null,15,"div",[["class","row margin-top-1rem"]],null,null,null,null,null)),(l()(),t.tb(8,0,null,null,14,"div",[["class","col-sm-6"]],null,null,null,null,null)),(l()(),t.tb(9,0,null,null,13,"div",[["class","card"]],null,null,null,null,null)),(l()(),t.tb(10,0,null,null,1,"div",[["class","card-header bg-primary text-white"]],null,null,null,null,null)),(l()(),t.Lb(-1,null,["Reporte por producto"])),(l()(),t.tb(12,0,null,null,4,"div",[["class","card-body"],["style","height: 130px;"]],null,null,null,null,null)),(l()(),t.tb(13,0,null,null,1,"h5",[["class","card-title"]],null,null,null,null,null)),(l()(),t.Lb(-1,null,["Buscar por producto y fechas"])),(l()(),t.tb(15,0,null,null,1,"p",[["class","card-text text-small"]],null,null,null,null,null)),(l()(),t.Lb(-1,null,["Reporte que muestra por fechas y un producto, el historial de compras y ventas de ese producto en esa fecha. Con \xe9ste reporte se puede realizar un seguimiento del historial de compras y ventas del producto."])),(l()(),t.tb(17,0,null,null,5,"div",[["class","card-body"],["role","alert"]],null,null,null,null,null)),(l()(),t.tb(18,0,null,null,4,"a",[["class","btn btn-outline-primary btn-sm"],["routerLink","./by-dates-and-product"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==t.Db(l,19).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&e),e},null,null)),t.sb(19,671744,null,0,i.m,[i.k,i.a,s.k],{routerLink:[0,"routerLink"]},null),(l()(),t.Lb(-1,null,[" Ir al reporte ..."])),(l()(),t.tb(21,0,null,null,1,"fa-icon",[["class","text-outline-primary mb-2 mr-1 ng-fa-icon"]],[[8,"innerHTML",1]],null,null,c.b,c.a)),t.sb(22,573440,null,0,b.a,[d.c,b.b],{iconProp:[0,"iconProp"]},null)],function(l,n){var u=n.component;l(n,1,0,"Reportes de producto"),l(n,19,0,"./by-dates-and-product"),l(n,22,0,u.faAngleDoubleRight)},function(l,n){l(n,18,0,t.Db(n,19).target,t.Db(n,19).href),l(n,21,0,t.Db(n,22).renderedIconHTML)})}var h=t.pb("app-product-report-main",g,function(l){return t.Nb(0,[(l()(),t.tb(0,0,null,null,1,"app-product-report-main",[],null,null,null,f,m)),t.sb(1,114688,null,0,g,[],null,null)],function(l,n){l(n,1,0)},null)},{},{},[]),y=u("gIcY"),v=u("UUjr"),D=u("ciq7"),k=u("bMPK"),P=u("EFU/"),B=u("UtLt"),_=u("4D9t"),T=u("eDkP"),O=u("Tq4R"),S=u("5FQz"),w=u("7qyy"),L=u("NlNA"),I=u("IXT0"),C=u("AytR"),F=u("LfDE"),x=u("j1uC"),N=u("dY7N"),H=u("V3nU"),$=u("wd/R"),M=u("xMyE"),E=u("bE4C"),A=u("mB2O"),j=function(){function l(l,n,u,t,e,r){this.globalStoreService=l,this.operationService=n,this.formToolService=u,this.operationProductService=t,this.productService=e,this.fb=r,this.faEye=p.s,this.faEdit=p.q,this.faSearch=p.L,this.faCalendar=p.j,this.activeUser=new L.a,this.product=new E.a,this.lstProductsFound=[],this.lstProducts=[],this.selectedOperation=new I.a,this.consolidate_day=C.a.consolidate_day,this.emptyPrd=!0,this.lastkeydown1=0}return l.prototype.ngOnInit=function(){this.activeUser=this.globalStoreService.getUser(),this.dateEnd=$().add(1,"days").format("YYYY-MM-DD"),this.dateInit=$().add(-this.consolidate_day,"days").format("YYYY-MM-DD"),this.initUpdForm(this.dateInit,this.dateEnd)},l.prototype.onFindProduct=function(l){var n=this,u=document.getElementById("filterProduct").value;this.lstProducts=[],u.length>0&&(this.emptyPrd=!1,l.timeStamp-this.lastkeydown1>200&&this.productService.getByNameFilterAndType$(u).subscribe(function(l){n.lstProductsFound=l,1==l.length&&n.selectProduct(l[0])},function(){return n.emptyPrd=!0}))},l.prototype.selectProduct=function(l){this.product=l,this.lstProductsFound=[],this.reportForm.patchValue({id_product:l.pk_id_product,name_product:l.name})},l.prototype.getDataByParams=function(){var l=this;this.operationService.getListByProduct$(this.reportForm.value.id_product,$(this.reportForm.value.from_date).format("YYYY-MM-DD"),$(this.reportForm.value.to_date).format("YYYY-MM-DD")).subscribe(function(n){return l.resultData=n})},l.prototype.initUpdForm=function(l,n){this.reportForm=this.fb.group({from_date:[l,y.t.required],to_date:[n,y.t.required],id_product:[""],name_product:["",y.t.required]})},l.prototype.selectOperation=function(l){var n=this;this.operationProductService.getProductsByOperation$(l.pk_id_operation).pipe(Object(M.a)(function(l){n.lstProducts=l}),Object(M.a)(function(){return n.operationService.getDetailOperation$(l.pk_id_operation).subscribe(function(l){return n.selectedOperation=l})})).subscribe()},l.prototype.getErrors=function(l){return this.formToolService.getErrors(this.reportForm,l)},l.prototype.mustShowError=function(l){return this.formToolService.mustShowError(this.reportForm,l)},l.prototype.hasError=function(l,n){return this.formToolService.hasError(this.reportForm,l,n)},l}(),q=t.rb({encapsulation:2,styles:[],data:{}});function Y(l){return t.Nb(0,[(l()(),t.tb(0,0,null,null,2,"div",[["class","items row"]],null,null,null,null,null)),(l()(),t.tb(1,0,null,null,1,"div",[["class","col-sm-12"]],null,[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.selectProduct(l.context.$implicit)&&t),t},null,null)),(l()(),t.Lb(2,null,[" "," "," "]))],null,function(l,n){l(n,2,0,n.context.$implicit.code,n.context.$implicit.name)})}function R(l){return t.Nb(0,[(l()(),t.tb(0,0,null,null,3,"div",[["class","col-sm-4 text-right"]],null,null,null,null,null)),(l()(),t.tb(1,0,null,null,2,"h6",[],null,null,null,null,null)),(l()(),t.Lb(2,null,["Unidades disponibles: ",""])),t.Hb(3,1)],null,function(l,n){var u=n.component;l(n,2,0,t.Mb(n,2,0,l(n,3,0,t.Db(n.parent,0),u.product.units_package*u.resultData.total_purchase[0].packages+u.resultData.total_purchase[0].units-(u.product.units_package*u.resultData.total_sales[0].packages+u.resultData.total_sales[0].units))))})}function U(l){return t.Nb(0,[(l()(),t.tb(0,0,null,null,3,"div",[["class","col-sm-4"]],null,null,null,null,null)),(l()(),t.tb(1,0,null,null,2,"h6",[],null,null,null,null,null)),(l()(),t.Lb(2,null,["Total unidades: ",""])),t.Hb(3,1)],null,function(l,n){var u=n.component;l(n,2,0,t.Mb(n,2,0,l(n,3,0,t.Db(n.parent.parent,0),u.product.units_package*u.resultData.total_purchase[0].packages+u.resultData.total_purchase[0].units)))})}function K(l){return t.Nb(0,[(l()(),t.tb(0,0,null,null,26,"tr",[],null,null,null,null,null)),(l()(),t.tb(1,0,null,null,25,"td",[["colspan","3"]],null,null,null,null,null)),(l()(),t.tb(2,0,null,null,11,"div",[["class","row"]],null,null,null,null,null)),(l()(),t.tb(3,0,null,null,8,"div",[["class","col-sm-6"]],null,null,null,null,null)),(l()(),t.tb(4,0,null,null,2,"a",[["class","stretched-link"],["data-target","#operationSmallModal"],["data-toggle","modal"],["type","button"]],null,[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.selectOperation(l.context.$implicit)&&t),t},null,null)),(l()(),t.tb(5,0,null,null,1,"fa-icon",[["class","text-danger mb-2 mr-1 ng-fa-icon"],["title","Ver registro"]],[[8,"innerHTML",1]],null,null,c.b,c.a)),t.sb(6,573440,null,0,b.a,[d.c,b.b],{iconProp:[0,"iconProp"],title:[1,"title"]},null),(l()(),t.tb(7,0,null,null,3,"a",[["class","stretched-link alert-link"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==t.Db(l,8).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&e),e},null,null)),t.sb(8,671744,null,0,i.m,[i.k,i.a,s.k],{routerLink:[0,"routerLink"]},null),(l()(),t.tb(9,0,null,null,1,"fa-icon",[["class","text-danger mb-2 mr-1 ng-fa-icon"],["title","Editar registro"]],[[8,"innerHTML",1]],null,null,c.b,c.a)),t.sb(10,573440,null,0,b.a,[d.c,b.b],{iconProp:[0,"iconProp"],title:[1,"title"]},null),(l()(),t.Lb(11,null,[" "," "])),(l()(),t.tb(12,0,null,null,1,"div",[["class","col-sm-6"]],null,null,null,null,null)),(l()(),t.Lb(13,null,["",""])),(l()(),t.tb(14,0,null,null,12,"div",[["class","row"]],null,null,null,null,null)),(l()(),t.tb(15,0,null,null,5,"div",[["class","col-sm-6"]],null,null,null,null,null)),(l()(),t.tb(16,0,null,null,4,"span",[["class","font-weight-bold"]],null,null,null,null,null)),(l()(),t.Lb(-1,null,["Paquetes "])),(l()(),t.tb(18,0,null,null,2,"span",[["class","badge badge-danger"]],null,null,null,null,null)),(l()(),t.Lb(19,null,["",""])),t.Hb(20,1),(l()(),t.tb(21,0,null,null,5,"div",[["class","col-sm-6"]],null,null,null,null,null)),(l()(),t.tb(22,0,null,null,4,"span",[["class","font-weight-bold"]],null,null,null,null,null)),(l()(),t.Lb(-1,null,["Unidades "])),(l()(),t.tb(24,0,null,null,2,"span",[["class","badge badge-danger"]],null,null,null,null,null)),(l()(),t.Lb(25,null,["",""])),t.Hb(26,1)],function(l,n){var u=n.component;l(n,6,0,u.faEye,"Ver registro"),l(n,8,0,t.vb(1,"../../../purchases/purchase-detailed-show/",n.context.$implicit.pk_id_operation,"")),l(n,10,0,u.faEdit,"Editar registro")},function(l,n){l(n,5,0,t.Db(n,6).renderedIconHTML),l(n,7,0,t.Db(n,8).target,t.Db(n,8).href),l(n,9,0,t.Db(n,10).renderedIconHTML),l(n,11,0,n.context.$implicit.number_invoice),l(n,13,0,n.context.$implicit.date_operation),l(n,19,0,t.Mb(n,19,0,l(n,20,0,t.Db(n.parent.parent.parent,0),n.context.$implicit.number_package))),l(n,25,0,t.Mb(n,25,0,l(n,26,0,t.Db(n.parent.parent.parent,0),n.context.$implicit.number_units)))})}function V(l){return t.Nb(0,[(l()(),t.tb(0,0,null,null,22,"table",[["class","table table-sm table-hover"]],null,null,null,null,null)),(l()(),t.tb(1,0,null,null,18,"thead",[],null,null,null,null,null)),(l()(),t.tb(2,0,null,null,14,"tr",[],null,null,null,null,null)),(l()(),t.tb(3,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Lb(-1,null,["Totales"])),(l()(),t.tb(5,0,null,null,5,"th",[],null,null,null,null,null)),(l()(),t.tb(6,0,null,null,4,"span",[["class","font-weight-bold"]],null,null,null,null,null)),(l()(),t.Lb(-1,null,["Paquetes "])),(l()(),t.tb(8,0,null,null,2,"span",[["class","badge badge-danger"]],null,null,null,null,null)),(l()(),t.Lb(9,null,["",""])),t.Hb(10,1),(l()(),t.tb(11,0,null,null,5,"th",[],null,null,null,null,null)),(l()(),t.tb(12,0,null,null,4,"span",[["class","font-weight-bold"]],null,null,null,null,null)),(l()(),t.Lb(-1,null,["Unidades "])),(l()(),t.tb(14,0,null,null,2,"span",[["class","badge badge-danger"]],null,null,null,null,null)),(l()(),t.Lb(15,null,["",""])),t.Hb(16,1),(l()(),t.tb(17,0,null,null,2,"tr",[],null,null,null,null,null)),(l()(),t.tb(18,0,null,null,1,"th",[["colspan","3"]],null,null,null,null,null)),(l()(),t.Lb(-1,null,["Informaci\xf3n compra"])),(l()(),t.tb(20,0,null,null,2,"tbody",[],null,null,null,null,null)),(l()(),t.kb(16777216,null,null,1,null,K)),t.sb(22,278528,null,0,s.n,[t.S,t.P,t.u],{ngForOf:[0,"ngForOf"]},null)],function(l,n){l(n,22,0,n.component.resultData.purchase)},function(l,n){var u=n.component;l(n,9,0,t.Mb(n,9,0,l(n,10,0,t.Db(n.parent.parent,0),u.resultData.total_purchase[0].packages))),l(n,15,0,t.Mb(n,15,0,l(n,16,0,t.Db(n.parent.parent,0),u.resultData.total_purchase[0].units)))})}function G(l){return t.Nb(0,[(l()(),t.tb(0,0,null,null,3,"div",[["class","col-sm-4"]],null,null,null,null,null)),(l()(),t.tb(1,0,null,null,2,"h6",[],null,null,null,null,null)),(l()(),t.Lb(2,null,["Total unidades: ",""])),t.Hb(3,1)],null,function(l,n){var u=n.component;l(n,2,0,t.Mb(n,2,0,l(n,3,0,t.Db(n.parent.parent,0),u.product.units_package*u.resultData.total_sales[0].packages+u.resultData.total_sales[0].units)))})}function z(l){return t.Nb(0,[(l()(),t.tb(0,0,null,null,26,"tr",[],null,null,null,null,null)),(l()(),t.tb(1,0,null,null,25,"td",[["colspan","3"]],null,null,null,null,null)),(l()(),t.tb(2,0,null,null,11,"div",[["class","row"]],null,null,null,null,null)),(l()(),t.tb(3,0,null,null,8,"div",[["class","col-sm-6"]],null,null,null,null,null)),(l()(),t.tb(4,0,null,null,2,"a",[["class","stretched-link"],["data-target","#operationSmallModal"],["data-toggle","modal"],["type","button"]],null,[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.selectOperation(l.context.$implicit)&&t),t},null,null)),(l()(),t.tb(5,0,null,null,1,"fa-icon",[["class","text-primary mb-2 mr-1 ng-fa-icon"],["title","Ver registro"]],[[8,"innerHTML",1]],null,null,c.b,c.a)),t.sb(6,573440,null,0,b.a,[d.c,b.b],{iconProp:[0,"iconProp"],title:[1,"title"]},null),(l()(),t.tb(7,0,null,null,3,"a",[["class","stretched-link alert-link"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==t.Db(l,8).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&e),e},null,null)),t.sb(8,671744,null,0,i.m,[i.k,i.a,s.k],{routerLink:[0,"routerLink"]},null),(l()(),t.tb(9,0,null,null,1,"fa-icon",[["class","text-primary mb-2 mr-1 ng-fa-icon"],["title","Editar registro"]],[[8,"innerHTML",1]],null,null,c.b,c.a)),t.sb(10,573440,null,0,b.a,[d.c,b.b],{iconProp:[0,"iconProp"],title:[1,"title"]},null),(l()(),t.Lb(11,null,[" "," "])),(l()(),t.tb(12,0,null,null,1,"div",[["class","col-sm-6"]],null,null,null,null,null)),(l()(),t.Lb(13,null,["",""])),(l()(),t.tb(14,0,null,null,12,"div",[["class","row"]],null,null,null,null,null)),(l()(),t.tb(15,0,null,null,5,"div",[["class","col-sm-6"]],null,null,null,null,null)),(l()(),t.tb(16,0,null,null,4,"span",[["class","font-weight-bold"]],null,null,null,null,null)),(l()(),t.Lb(-1,null,["Paquetes "])),(l()(),t.tb(18,0,null,null,2,"span",[["class","badge badge-primary"]],null,null,null,null,null)),(l()(),t.Lb(19,null,["",""])),t.Hb(20,1),(l()(),t.tb(21,0,null,null,5,"div",[["class","col-sm-6"]],null,null,null,null,null)),(l()(),t.tb(22,0,null,null,4,"span",[["class","font-weight-bold"]],null,null,null,null,null)),(l()(),t.Lb(-1,null,["Unidades "])),(l()(),t.tb(24,0,null,null,2,"span",[["class","badge badge-primary"]],null,null,null,null,null)),(l()(),t.Lb(25,null,["",""])),t.Hb(26,1)],function(l,n){var u=n.component;l(n,6,0,u.faEye,"Ver registro"),l(n,8,0,t.vb(1,"../../../sales/sales-detailed-show/",n.context.$implicit.pk_id_operation,"")),l(n,10,0,u.faEdit,"Editar registro")},function(l,n){l(n,5,0,t.Db(n,6).renderedIconHTML),l(n,7,0,t.Db(n,8).target,t.Db(n,8).href),l(n,9,0,t.Db(n,10).renderedIconHTML),l(n,11,0,n.context.$implicit.number_invoice),l(n,13,0,n.context.$implicit.date_operation),l(n,19,0,t.Mb(n,19,0,l(n,20,0,t.Db(n.parent.parent.parent,0),n.context.$implicit.number_package))),l(n,25,0,t.Mb(n,25,0,l(n,26,0,t.Db(n.parent.parent.parent,0),n.context.$implicit.number_units)))})}function J(l){return t.Nb(0,[(l()(),t.tb(0,0,null,null,22,"table",[["class","table table-sm table-hover"]],null,null,null,null,null)),(l()(),t.tb(1,0,null,null,18,"thead",[],null,null,null,null,null)),(l()(),t.tb(2,0,null,null,14,"tr",[],null,null,null,null,null)),(l()(),t.tb(3,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Lb(-1,null,["Totales"])),(l()(),t.tb(5,0,null,null,5,"th",[],null,null,null,null,null)),(l()(),t.tb(6,0,null,null,4,"span",[["class","font-weight-bold"]],null,null,null,null,null)),(l()(),t.Lb(-1,null,["Paquetes "])),(l()(),t.tb(8,0,null,null,2,"span",[["class","badge badge-primary"]],null,null,null,null,null)),(l()(),t.Lb(9,null,["",""])),t.Hb(10,1),(l()(),t.tb(11,0,null,null,5,"th",[],null,null,null,null,null)),(l()(),t.tb(12,0,null,null,4,"span",[["class","font-weight-bold"]],null,null,null,null,null)),(l()(),t.Lb(-1,null,["Unidades "])),(l()(),t.tb(14,0,null,null,2,"span",[["class","badge badge-primary"]],null,null,null,null,null)),(l()(),t.Lb(15,null,["",""])),t.Hb(16,1),(l()(),t.tb(17,0,null,null,2,"tr",[],null,null,null,null,null)),(l()(),t.tb(18,0,null,null,1,"th",[["colspan","3"]],null,null,null,null,null)),(l()(),t.Lb(-1,null,["Informaci\xf3n compra"])),(l()(),t.tb(20,0,null,null,2,"tbody",[],null,null,null,null,null)),(l()(),t.kb(16777216,null,null,1,null,z)),t.sb(22,278528,null,0,s.n,[t.S,t.P,t.u],{ngForOf:[0,"ngForOf"]},null)],function(l,n){l(n,22,0,n.component.resultData.sales)},function(l,n){var u=n.component;l(n,9,0,t.Mb(n,9,0,l(n,10,0,t.Db(n.parent.parent,0),u.resultData.total_sales[0].packages))),l(n,15,0,t.Mb(n,15,0,l(n,16,0,t.Db(n.parent.parent,0),u.resultData.total_sales[0].units)))})}function X(l){return t.Nb(0,[(l()(),t.tb(0,0,null,null,28,"div",[["class","row"]],null,null,null,null,null)),(l()(),t.tb(1,0,null,null,13,"div",[["class","col-sm-6"]],null,null,null,null,null)),(l()(),t.tb(2,0,null,null,12,"div",[["class","row"]],null,null,null,null,null)),(l()(),t.tb(3,0,null,null,11,"div",[["class","col-sm-12"]],null,null,null,null,null)),(l()(),t.tb(4,0,null,null,10,"div",[["class","card"]],null,null,null,null,null)),(l()(),t.tb(5,0,null,null,6,"div",[["class","card-header bg-danger text-white"]],null,null,null,null,null)),(l()(),t.tb(6,0,null,null,5,"div",[["class","row"]],null,null,null,null,null)),(l()(),t.tb(7,0,null,null,2,"div",[["class","col-sm-8"]],null,null,null,null,null)),(l()(),t.tb(8,0,null,null,1,"h6",[],null,null,null,null,null)),(l()(),t.Lb(-1,null,["Operaciones de compra"])),(l()(),t.kb(16777216,null,null,1,null,U)),t.sb(11,16384,null,0,s.o,[t.S,t.P],{ngIf:[0,"ngIf"]},null),(l()(),t.tb(12,0,null,null,2,"div",[["class","card-body"]],null,null,null,null,null)),(l()(),t.kb(16777216,null,null,1,null,V)),t.sb(14,16384,null,0,s.o,[t.S,t.P],{ngIf:[0,"ngIf"]},null),(l()(),t.tb(15,0,null,null,13,"div",[["class","col-sm-6"]],null,null,null,null,null)),(l()(),t.tb(16,0,null,null,12,"div",[["class","row"]],null,null,null,null,null)),(l()(),t.tb(17,0,null,null,11,"div",[["class","col-sm-12"]],null,null,null,null,null)),(l()(),t.tb(18,0,null,null,10,"div",[["class","card"]],null,null,null,null,null)),(l()(),t.tb(19,0,null,null,6,"div",[["class","card-header bg-primary text-white"]],null,null,null,null,null)),(l()(),t.tb(20,0,null,null,5,"div",[["class","row"]],null,null,null,null,null)),(l()(),t.tb(21,0,null,null,2,"div",[["class","col-sm-8"]],null,null,null,null,null)),(l()(),t.tb(22,0,null,null,1,"h6",[],null,null,null,null,null)),(l()(),t.Lb(-1,null,["Operaciones de venta"])),(l()(),t.kb(16777216,null,null,1,null,G)),t.sb(25,16384,null,0,s.o,[t.S,t.P],{ngIf:[0,"ngIf"]},null),(l()(),t.tb(26,0,null,null,2,"div",[["class","card-body"]],null,null,null,null,null)),(l()(),t.kb(16777216,null,null,1,null,J)),t.sb(28,16384,null,0,s.o,[t.S,t.P],{ngIf:[0,"ngIf"]},null)],function(l,n){var u=n.component;l(n,11,0,u.resultData),l(n,14,0,u.resultData.purchase),l(n,25,0,u.resultData),l(n,28,0,u.resultData.sales)},null)}function Z(l){return t.Nb(0,[t.Fb(0,s.f,[t.w]),(l()(),t.tb(1,0,null,null,93,"app-pages",[["title","Reporte por fechas y producto"]],null,null,null,a.b,a.a)),t.sb(2,114688,null,0,o.a,[],{title:[0,"title"]},null),(l()(),t.tb(3,0,null,0,91,"main",[],null,null,null,null,null)),(l()(),t.tb(4,0,null,null,90,"section",[],null,null,null,null,null)),(l()(),t.tb(5,0,null,null,2,"div",[["class","row bg-gray"]],null,null,null,null,null)),(l()(),t.tb(6,0,null,null,1,"div",[["class","col-sm-12 text-left"]],null,null,null,null,null)),(l()(),t.Lb(-1,null,[" Reporte de hist\xf3rico de compra y venta de productos por fechas y producto. "])),(l()(),t.tb(8,0,null,null,86,"div",[["class","row margin-top-1rem"]],null,null,null,null,null)),(l()(),t.tb(9,0,null,null,71,"div",[["class","col-sm-3"]],null,null,null,null,null)),(l()(),t.tb(10,0,null,null,70,"div",[["class","card"]],null,null,null,null,null)),(l()(),t.tb(11,0,null,null,2,"div",[["class","card-header"]],null,null,null,null,null)),(l()(),t.tb(12,0,null,null,1,"h6",[],null,null,null,null,null)),(l()(),t.Lb(-1,null,["Criterios de b\xfasqueda"])),(l()(),t.tb(14,0,null,null,66,"div",[["class","card-body"]],null,null,null,null,null)),(l()(),t.tb(15,0,null,null,65,"form",[["novalidate",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"submit"],[null,"reset"]],function(l,n,u){var e=!0;return"submit"===n&&(e=!1!==t.Db(l,17).onSubmit(u)&&e),"reset"===n&&(e=!1!==t.Db(l,17).onReset()&&e),e},null,null)),t.sb(16,16384,null,0,y.w,[],null,null),t.sb(17,540672,null,0,y.i,[[8,null],[8,null]],{form:[0,"form"]},null),t.Ib(2048,null,y.d,null,[y.i]),t.sb(19,16384,null,0,y.o,[[4,y.d]],null,null),(l()(),t.tb(20,0,null,null,20,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),t.tb(21,0,null,null,1,"label",[["for","from_date"]],null,null,null,null,null)),(l()(),t.Lb(-1,null,["Fecha inicial"])),(l()(),t.tb(23,0,null,null,1,"small",[["class","form-text text-muted"],["id","emailHelp"]],null,null,null,null,null)),(l()(),t.Lb(-1,null,["Fecha inicial del rango a buscar datos."])),(l()(),t.tb(25,0,null,null,15,"div",[["class","input-group input-group-sm mb-3"]],null,null,null,null,null)),(l()(),t.tb(26,0,null,null,4,"div",[["class","input-group-prepend"]],null,null,null,null,null)),(l()(),t.tb(27,0,null,null,3,"span",[["class","btn text-small btn-sm btn-outline-secondary"]],[[2,"owl-dt-trigger-disabled",null]],[[null,"click"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==t.Db(l,28).handleClickOnHost(u)&&e),e},null,null)),t.sb(28,1785856,null,0,v.a,[t.i],{dtPicker:[0,"dtPicker"]},null),(l()(),t.tb(29,0,null,null,1,"fa-icon",[["class","text-secondary ng-fa-icon"]],[[8,"innerHTML",1]],null,null,c.b,c.a)),t.sb(30,573440,null,0,b.a,[d.c,b.b],{iconProp:[0,"iconProp"]},null),(l()(),t.tb(31,0,null,null,7,"input",[["class","form-control text-small"],["formControlName","from_date"],["placeholder","Desde"],["type","text"]],[[1,"aria-haspopup",0],[1,"aria-owns",0],[1,"min",0],[1,"max",0],[8,"disabled",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"],[null,"keydown"],[null,"change"]],function(l,n,u){var e=!0;return"input"===n&&(e=!1!==t.Db(l,32)._handleInput(u.target.value)&&e),"blur"===n&&(e=!1!==t.Db(l,32).onTouched()&&e),"compositionstart"===n&&(e=!1!==t.Db(l,32)._compositionStart()&&e),"compositionend"===n&&(e=!1!==t.Db(l,32)._compositionEnd(u.target.value)&&e),"keydown"===n&&(e=!1!==t.Db(l,33).handleKeydownOnHost(u)&&e),"blur"===n&&(e=!1!==t.Db(l,33).handleBlurOnHost(u)&&e),"input"===n&&(e=!1!==t.Db(l,33).handleInputOnHost(u)&&e),"change"===n&&(e=!1!==t.Db(l,33).handleChangeOnHost(u)&&e),e},null,null)),t.sb(32,16384,null,0,y.e,[t.G,t.l,[2,y.a]],null,null),t.sb(33,1261568,null,0,D.a,[t.l,t.G,[2,k.a],[2,P.a]],{owlDateTime:[0,"owlDateTime"]},null),t.Ib(1024,null,y.k,function(l){return[l]},[D.a]),t.Ib(1024,null,y.l,function(l,n){return[l,n]},[y.e,D.a]),t.sb(36,671744,null,0,y.h,[[3,y.d],[6,y.k],[8,null],[6,y.l],[2,y.y]],{name:[0,"name"]},null),t.Ib(2048,null,y.m,null,[y.h]),t.sb(38,16384,null,0,y.n,[[4,y.m]],null,null),(l()(),t.tb(39,16777216,null,null,1,"owl-date-time",[],null,null,null,B.b,B.a)),t.sb(40,245760,[["from_date",4]],0,_.c,[T.b,t.S,O.d,t.B,t.i,[2,k.a],_.a,[2,P.a],[2,s.d]],{pickerType:[0,"pickerType"]},null),(l()(),t.tb(41,0,null,null,20,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),t.tb(42,0,null,null,1,"label",[["for","to_date"]],null,null,null,null,null)),(l()(),t.Lb(-1,null,["Fecha final"])),(l()(),t.tb(44,0,null,null,1,"small",[["class","form-text text-muted"],["id","emailHelp"]],null,null,null,null,null)),(l()(),t.Lb(-1,null,["Fecha final del rango a buscar datos."])),(l()(),t.tb(46,0,null,null,15,"div",[["class","input-group input-group-sm mb-3"]],null,null,null,null,null)),(l()(),t.tb(47,0,null,null,4,"div",[["class","input-group-prepend"]],null,null,null,null,null)),(l()(),t.tb(48,0,null,null,3,"span",[["class","btn text-small btn-sm btn-outline-secondary"]],[[2,"owl-dt-trigger-disabled",null]],[[null,"click"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==t.Db(l,49).handleClickOnHost(u)&&e),e},null,null)),t.sb(49,1785856,null,0,v.a,[t.i],{dtPicker:[0,"dtPicker"]},null),(l()(),t.tb(50,0,null,null,1,"fa-icon",[["class","text-secondary ng-fa-icon"]],[[8,"innerHTML",1]],null,null,c.b,c.a)),t.sb(51,573440,null,0,b.a,[d.c,b.b],{iconProp:[0,"iconProp"]},null),(l()(),t.tb(52,0,null,null,7,"input",[["class","form-control text-small"],["formControlName","to_date"],["placeholder","Desde"],["type","text"]],[[1,"aria-haspopup",0],[1,"aria-owns",0],[1,"min",0],[1,"max",0],[8,"disabled",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"],[null,"keydown"],[null,"change"]],function(l,n,u){var e=!0;return"input"===n&&(e=!1!==t.Db(l,53)._handleInput(u.target.value)&&e),"blur"===n&&(e=!1!==t.Db(l,53).onTouched()&&e),"compositionstart"===n&&(e=!1!==t.Db(l,53)._compositionStart()&&e),"compositionend"===n&&(e=!1!==t.Db(l,53)._compositionEnd(u.target.value)&&e),"keydown"===n&&(e=!1!==t.Db(l,54).handleKeydownOnHost(u)&&e),"blur"===n&&(e=!1!==t.Db(l,54).handleBlurOnHost(u)&&e),"input"===n&&(e=!1!==t.Db(l,54).handleInputOnHost(u)&&e),"change"===n&&(e=!1!==t.Db(l,54).handleChangeOnHost(u)&&e),e},null,null)),t.sb(53,16384,null,0,y.e,[t.G,t.l,[2,y.a]],null,null),t.sb(54,1261568,null,0,D.a,[t.l,t.G,[2,k.a],[2,P.a]],{owlDateTime:[0,"owlDateTime"]},null),t.Ib(1024,null,y.k,function(l){return[l]},[D.a]),t.Ib(1024,null,y.l,function(l,n){return[l,n]},[y.e,D.a]),t.sb(57,671744,null,0,y.h,[[3,y.d],[6,y.k],[8,null],[6,y.l],[2,y.y]],{name:[0,"name"]},null),t.Ib(2048,null,y.m,null,[y.h]),t.sb(59,16384,null,0,y.n,[[4,y.m]],null,null),(l()(),t.tb(60,16777216,null,null,1,"owl-date-time",[],null,null,null,B.b,B.a)),t.sb(61,245760,[["to_date",4]],0,_.c,[T.b,t.S,O.d,t.B,t.i,[2,k.a],_.a,[2,P.a],[2,s.d]],{pickerType:[0,"pickerType"]},null),(l()(),t.tb(62,0,null,null,16,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),t.tb(63,0,null,null,1,"label",[["for","name_product"]],null,null,null,null,null)),(l()(),t.Lb(-1,null,["Nombre de producto"])),(l()(),t.tb(65,0,null,null,1,"small",[["class","form-text text-muted"],["id","emailHelp"]],null,null,null,null,null)),(l()(),t.Lb(-1,null,["Producto a buscar, por nombre."])),(l()(),t.tb(67,0,null,null,7,"input",[["class","form-control text-small"],["formControlName","name_product"],["id","filterProduct"],["placeholder","Producto"],["required",""],["type","text"]],[[1,"required",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"keyup"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,u){var e=!0,r=l.component;return"input"===n&&(e=!1!==t.Db(l,68)._handleInput(u.target.value)&&e),"blur"===n&&(e=!1!==t.Db(l,68).onTouched()&&e),"compositionstart"===n&&(e=!1!==t.Db(l,68)._compositionStart()&&e),"compositionend"===n&&(e=!1!==t.Db(l,68)._compositionEnd(u.target.value)&&e),"keyup"===n&&(e=!1!==r.onFindProduct(u)&&e),e},null,null)),t.sb(68,16384,null,0,y.e,[t.G,t.l,[2,y.a]],null,null),t.sb(69,16384,null,0,y.r,[],{required:[0,"required"]},null),t.Ib(1024,null,y.k,function(l){return[l]},[y.r]),t.Ib(1024,null,y.l,function(l){return[l]},[y.e]),t.sb(72,671744,null,0,y.h,[[3,y.d],[6,y.k],[8,null],[6,y.l],[2,y.y]],{name:[0,"name"]},null),t.Ib(2048,null,y.m,null,[y.h]),t.sb(74,16384,null,0,y.n,[[4,y.m]],null,null),(l()(),t.tb(75,0,null,null,3,"div",[["class","autocomplete container-fluid"]],null,null,null,null,null)),(l()(),t.tb(76,0,null,null,2,"div",[["class","autocomplete-items text-ultra-small"],["id","autocomplete-list"]],null,null,null,null,null)),(l()(),t.kb(16777216,null,null,1,null,Y)),t.sb(78,278528,null,0,s.n,[t.S,t.P,t.u],{ngForOf:[0,"ngForOf"]},null),(l()(),t.tb(79,0,null,null,1,"button",[["class","btn btn-outline-success btn-sm mb-2 mr-1"],["type","submit"]],[[8,"disabled",0]],[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.getDataByParams()&&t),t},null,null)),(l()(),t.Lb(-1,null,["Buscar"])),(l()(),t.tb(81,0,null,null,13,"div",[["class","col-sm-9"]],null,null,null,null,null)),(l()(),t.tb(82,0,null,null,12,"div",[["class","row"]],null,null,null,null,null)),(l()(),t.tb(83,0,null,null,11,"div",[["class","col-sm-12"]],null,null,null,null,null)),(l()(),t.tb(84,0,null,null,10,"div",[["class","card"]],null,null,null,null,null)),(l()(),t.tb(85,0,null,null,6,"div",[["class","card-header bg-success text-white"]],null,null,null,null,null)),(l()(),t.tb(86,0,null,null,5,"div",[["class","row"]],null,null,null,null,null)),(l()(),t.tb(87,0,null,null,2,"div",[["class","col-sm-8"]],null,null,null,null,null)),(l()(),t.tb(88,0,null,null,1,"h6",[],null,null,null,null,null)),(l()(),t.Lb(-1,null,["Operaciones Encontradas"])),(l()(),t.kb(16777216,null,null,1,null,R)),t.sb(91,16384,null,0,s.o,[t.S,t.P],{ngIf:[0,"ngIf"]},null),(l()(),t.tb(92,0,null,null,2,"div",[["class","card-body"]],null,null,null,null,null)),(l()(),t.kb(16777216,null,null,1,null,X)),t.sb(94,16384,null,0,s.o,[t.S,t.P],{ngIf:[0,"ngIf"]},null),(l()(),t.tb(95,0,null,null,1,"app-small-operation",[],null,null,null,S.b,S.a)),t.sb(96,638976,null,0,w.a,[],{operation:[0,"operation"],lstProducts:[1,"lstProducts"]},null)],function(l,n){var u=n.component;l(n,2,0,"Reporte por fechas y producto"),l(n,17,0,u.reportForm),l(n,28,0,t.Db(n,40)),l(n,30,0,u.faCalendar),l(n,33,0,t.Db(n,40)),l(n,36,0,"from_date"),l(n,40,0,"calendar"),l(n,49,0,t.Db(n,61)),l(n,51,0,u.faCalendar),l(n,54,0,t.Db(n,61)),l(n,57,0,"to_date"),l(n,61,0,"calendar"),l(n,69,0,""),l(n,72,0,"name_product"),l(n,78,0,u.lstProductsFound),l(n,91,0,u.resultData),l(n,94,0,u.resultData),l(n,96,0,u.selectedOperation,u.lstProducts)},function(l,n){var u=n.component;l(n,15,0,t.Db(n,19).ngClassUntouched,t.Db(n,19).ngClassTouched,t.Db(n,19).ngClassPristine,t.Db(n,19).ngClassDirty,t.Db(n,19).ngClassValid,t.Db(n,19).ngClassInvalid,t.Db(n,19).ngClassPending),l(n,27,0,t.Db(n,28).owlDTTriggerDisabledClass),l(n,29,0,t.Db(n,30).renderedIconHTML),l(n,31,1,[t.Db(n,33).owlDateTimeInputAriaHaspopup,t.Db(n,33).owlDateTimeInputAriaOwns,t.Db(n,33).minIso8601,t.Db(n,33).maxIso8601,t.Db(n,33).owlDateTimeInputDisabled,t.Db(n,38).ngClassUntouched,t.Db(n,38).ngClassTouched,t.Db(n,38).ngClassPristine,t.Db(n,38).ngClassDirty,t.Db(n,38).ngClassValid,t.Db(n,38).ngClassInvalid,t.Db(n,38).ngClassPending]),l(n,48,0,t.Db(n,49).owlDTTriggerDisabledClass),l(n,50,0,t.Db(n,51).renderedIconHTML),l(n,52,1,[t.Db(n,54).owlDateTimeInputAriaHaspopup,t.Db(n,54).owlDateTimeInputAriaOwns,t.Db(n,54).minIso8601,t.Db(n,54).maxIso8601,t.Db(n,54).owlDateTimeInputDisabled,t.Db(n,59).ngClassUntouched,t.Db(n,59).ngClassTouched,t.Db(n,59).ngClassPristine,t.Db(n,59).ngClassDirty,t.Db(n,59).ngClassValid,t.Db(n,59).ngClassInvalid,t.Db(n,59).ngClassPending]),l(n,67,0,t.Db(n,69).required?"":null,t.Db(n,74).ngClassUntouched,t.Db(n,74).ngClassTouched,t.Db(n,74).ngClassPristine,t.Db(n,74).ngClassDirty,t.Db(n,74).ngClassValid,t.Db(n,74).ngClassInvalid,t.Db(n,74).ngClassPending),l(n,79,0,u.reportForm.invalid)})}var Q=t.pb("app-product-report-by-dates",j,function(l){return t.Nb(0,[(l()(),t.tb(0,0,null,null,1,"app-product-report-by-dates",[],null,null,null,Z,q)),t.sb(1,114688,null,0,j,[F.a,x.a,N.a,H.a,A.a,y.g],null,null)],function(l,n){l(n,1,0)},null)},{},{},[]),W=u("No7X"),ll=u("bIR2"),nl=u("kmKP"),ul=u("t/Na"),tl=u("Fzqc"),el=u("M2Lx"),rl=u("rAFq"),al=u("UiI2"),ol=u("dWZg"),il=function(){},sl=u("PCNd"),cl=u("4c35"),bl=u("qAlS"),dl=u("lLAP"),pl=u("jRYl"),gl=u("KL2N"),ml=u("QX+E");u.d(n,"ProductsReportsModuleNgFactory",function(){return fl});var fl=t.qb(e,[],function(l){return t.Ab([t.Bb(512,t.k,t.fb,[[8,[r.a,h,Q,W.a,ll.a]],[3,t.k],t.z]),t.Bb(4608,s.q,s.p,[t.w,[2,s.z]]),t.Bb(4608,y.g,y.g,[]),t.Bb(4608,y.x,y.x,[]),t.Bb(4608,N.a,N.a,[]),t.Bb(4608,nl.a,nl.a,[ul.c]),t.Bb(4608,T.b,T.b,[T.h,T.d,t.k,T.g,T.e,t.s,t.B,s.d,tl.b]),t.Bb(5120,T.i,T.j,[T.b]),t.Bb(4608,el.a,el.a,[]),t.Bb(5120,O.b,O.c,[T.b]),t.Bb(4608,O.d,O.d,[T.b,t.s,[2,s.j],O.b,[2,O.a],[3,O.d],T.d]),t.Bb(4608,rl.a,rl.a,[]),t.Bb(5120,_.a,_.b,[T.b]),t.Bb(4608,k.a,al.a,[[2,k.b],ol.a]),t.Bb(4608,H.a,H.a,[ul.c,nl.a]),t.Bb(4608,x.a,x.a,[ul.c,nl.a]),t.Bb(4608,A.a,A.a,[ul.c,nl.a]),t.Bb(1073742336,s.c,s.c,[]),t.Bb(1073742336,i.n,i.n,[[2,i.t],[2,i.k]]),t.Bb(1073742336,il,il,[]),t.Bb(1073742336,y.u,y.u,[]),t.Bb(1073742336,y.q,y.q,[]),t.Bb(1073742336,sl.a,sl.a,[]),t.Bb(1073742336,b.f,b.f,[]),t.Bb(1073742336,tl.a,tl.a,[]),t.Bb(1073742336,cl.g,cl.g,[]),t.Bb(1073742336,ol.b,ol.b,[]),t.Bb(1073742336,bl.a,bl.a,[]),t.Bb(1073742336,T.f,T.f,[]),t.Bb(1073742336,el.b,el.b,[]),t.Bb(1073742336,dl.a,dl.a,[]),t.Bb(1073742336,pl.a,pl.a,[]),t.Bb(1073742336,gl.a,gl.a,[]),t.Bb(1073742336,ml.a,ml.a,[]),t.Bb(1073742336,ml.b,ml.b,[]),t.Bb(1073742336,e,e,[]),t.Bb(1024,i.i,function(){return[[{path:"",component:g},{path:"by-dates-and-product",component:j}]]},[]),t.Bb(256,P.a,ml.c,[])])})}}]);