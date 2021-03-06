import { NotifierService } from './../../services/notifier/notifier.service';
import { LoadingService } from './../../services/loading/loading.service';
import { ServiceOrdersService } from './../../services/service-orders/service-orders.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { IServiceOrder } from '../../model/IServiceOrder';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.scss'],
})
export class CreateServiceComponent implements OnInit {
  // orderForm = new FormGroup({
  //   problem: new FormControl(''),
  //   name: new FormControl(''),
  //   number: new FormControl(''),
  //   description: new FormControl(''),
  // });
  orderForm: FormGroup;

  snackConf = {
    horizontalPosition: 'end',
    verticalPosition: 'top',
  };

  constructor(
    private fb: FormBuilder,
    private api: ServiceOrdersService,
    private notifier: NotifierService,
    public loading: LoadingService
  ) {}

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      name: ['', [Validators.maxLength(55), Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      number: ['', [Validators.required]],
      problem: ['', Validators.required],
      description: ['', [Validators.maxLength(256)]],
      status: 'open',
      dateOpend: new Date().toLocaleDateString(),
    });
  }

  onSubmit() {
    this.loading.setLoading();
    this.api.createServiceOrder(this.orderForm.value).subscribe(
      (result) => {
        this.notifier.sucess('Criado com sucesso');
        this.orderForm.reset();
        this.loading.setLoading();
        // setTimeout(() => {
        //   window.location.reload();
        // }, 5000);
      },
      (err) => {
        this.loading.setLoading();
        this.notifier.error(err);
      }
    );
  }
}

// profileForm = this.fb.group({
//   firstName: [''],
//   lastName: [''],
//   address: this.fb.group({
//     street: [''],
//     city: [''],
//     state: [''],
//     zip: ['']
//  }),
