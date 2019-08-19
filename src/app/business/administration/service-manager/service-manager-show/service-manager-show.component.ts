import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { ServiceEnterprise } from 'src/app/shared/models/service-enterprise';
import { ServiceEnterpriseService } from 'src/app/shared/services/service-enterprise.service';
import { faDonate, faDollarSign, faThList, faShieldAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { tap } from 'rxjs/operators';
import { PaymentServicesService } from 'src/app/shared/services/payment-services.service';
import { PaymentService } from 'src/app/shared/models/payment-service';
import { TypeService } from 'src/app/shared/models/type-service';
import { TypeServiceService } from 'src/app/shared/services/type-service.service';
import { AccessEnterpriseService } from 'src/app/shared/services/access-enterprise.service';
import { AccessEnterprise } from 'src/app/shared/models/access-enterprise';
import { Payment } from 'src/app/shared/models/payment';

@Component({
  selector: 'app-service-manager-show',
  templateUrl: 'service-manager-show.component.html',
  styles: []
})
export class ServiceManagerShowComponent implements OnInit {
  faDonate = faDonate;
  faDollarSign = faDollarSign;
  faThList = faThList;
  faShieldAlt = faShieldAlt;
  faTrashAlt = faTrashAlt;
   
  id = 0;
  serviceEnterprise: ServiceEnterprise = new ServiceEnterprise;
  enterprise: Enterprise = new Enterprise;
  paymentLst: PaymentService[] = [];
  typeService: TypeService = new TypeService;
  accessEnterprise: AccessEnterprise = new AccessEnterprise;

  selectedPayment: PaymentService = new PaymentService;

  success = false;
  message = '';

  constructor(
    private activateRoute:ActivatedRoute,
    private serviceEnterpriseService: ServiceEnterpriseService ,
    private enterpriseService: EnterpriseService,
    private paymentServiceService: PaymentServicesService,
    private typeServiceService: TypeServiceService,
    private accessEnterpriseService: AccessEnterpriseService
  ) { }

  ngOnInit() {
    let id = this.activateRoute.snapshot.params['id'];
    this.loadInfoById(id);
  }

  private loadInfoById(id:number){
    this.serviceEnterpriseService.show$(id).pipe(
      tap((service_enterprise:ServiceEnterprise) => this.serviceEnterprise = service_enterprise),
      tap((service_enterprise:ServiceEnterprise) => this.getEnterprise(parseInt(service_enterprise.reference_enterprise.split(':')[0]))),
      tap((service_enterprise:ServiceEnterprise) => this.getPaymentsByService(service_enterprise.pk_id_service_enterprise)),
      tap((service_enterprise:ServiceEnterprise) => this.getTypeServiceById(service_enterprise.fk_id_type_service)),
      tap((service_enterprise:ServiceEnterprise) => this.getInfoAccessEnterprise(parseInt(service_enterprise.reference_enterprise.split(':')[0])))
    ).subscribe()
  }

  public generateCypherKey(id:number){
    this.enterpriseService.getCypherKeyByEnterprise$(id).subscribe(
      () => this.getEnterprise(id)
    )
  }

  private getInfoAccessEnterprise(id:number){
    this.accessEnterpriseService.getAccessByEnterprise$(id).subscribe(
      access_enterprise => this.accessEnterprise = access_enterprise
    )
  }

  private getEnterprise(id:number){
    this.enterpriseService.show$(id).subscribe(
      enterprise => this.enterprise = enterprise
    )
  }

  private getPaymentsByService(id:number){
    this.paymentServiceService.getByEnterpriseService$(id).subscribe(
      payments_service => this.paymentLst = payments_service
    )
  }

  private getTypeServiceById(id:number){
    this.typeServiceService.show$(id).subscribe(
      type_service => this.typeService = type_service
    )
  }

  onAddPayment(paymentService:PaymentService){
    this.paymentServiceService.store$(paymentService).pipe(
      tap((payment:PaymentService) => {
        if(this.typeService.type_service == 'PROPIETARIO'){
          this.serviceEnterprise.balance_service = this.serviceEnterprise.balance_service - payment.value_payment;
          this.serviceEnterpriseService.update$(this.serviceEnterprise).subscribe(
            service_enterprise => this.serviceEnterprise = service_enterprise
          )
        }
      }),
      tap((payment:PaymentService) => {
        let access = new AccessEnterprise;
        access.fk_id_enterprise = this.enterprise.pk_id_enterprise;
        access.date_init_access = payment.date_init_service;
        access.date_end_access  = payment.date_end_service;
        access.cypher_key       = this.enterprise.cypher_key;

        this.accessEnterpriseService.store$(access).subscribe(
          access_enterprise => this.getInfoAccessEnterprise(access_enterprise.fk_id_enterprise)
        );
      }),
      //tap(() => this.getInfoAccessEnterprise(this.enterprise.pk_id_enterprise)),
      tap((payment:PaymentService) => {
        this.getPaymentsByService(payment.fk_id_service_enterprise);
        this.success = true;
        this.message = 'Se registra un pago satisfactoriamente';
      }),
    ).subscribe()
  }
}