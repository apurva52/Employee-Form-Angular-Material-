import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng-lts/api';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ConfirmationService } from 'primeng-lts/api'
import { MatSnackBar } from "@angular/material/snack-bar";
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';

export interface tab {
  name: string;
  type: string;
  value: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService, ConfirmationService],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class AppComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  employeForm: FormGroup;
  totalRecords: number;
  dataSource: any;
  displayedColumns: string[] = ["expand", "name", "contact", "email", "designation", "action"];
  updateemployeForm: FormGroup;
  designationoption: any[] = [];
  emplyedetails: any[] = [];
  finaldata: any[] = [];
  uniqid: number = 0;
  form: boolean = false;
  expandedElement: null;
  tabd: any[] = [];
  usersDB = [
    { userid: 'abc@media.com', password: 'abc123', username: 'tom' },
    { userid: 'def@media.com', password: 'def123', username: 'dick' }
  ];
  submitted: boolean;

  constructor(private confirmationService: ConfirmationService, private snackBar: MatSnackBar, private fb: FormBuilder, private messageService: MessageService, private http: HttpClient) { }

  ngOnInit(): void {
    // this.http.get('https://next.json-generator.com/api/json/get/NkgyIRnk9').subscribe(res => {
    //   console.log(res);
    //   let finaldata = []
    //   res['patients'].forEach(el => {
    //     //console.log(el)
    //     finaldata.push(el.diseases[0].medicines);
    //   });
    //   console.log(finaldata);
    //   //let tabd = [];

    //   finaldata.forEach(el => {
    //     console.log(el);
    //     let tabledata = {} as tab;
    //     el.array.forEach(td => {
    //       tabledata.name = el[0];
    //       tabledata.type = el[1];
    //       tabledata.value = el[2];
    //     });

    //     this.tabd.push(tabledata);
    //     //console.log(tabledata);
    //   })
    //   console.log(this.tabd);
    //   //tabd.push(temp);
    //   //tabledata
    //   //let temp = res.patients

    // })

    this.designationoption = [
      { label: 'Junior Software Engineer', value: 'Junior Software Engineer' },
      { label: 'Software Engineer', value: 'Software Engineer' },
      { label: 'Senior Software Engineer', value: 'Senior Software Engineer' },
    ];
    this.getData();
    this.setForm();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  setForm() {
    this.submitted = false;
    this.employeForm = this.fb.group({
      firstname: [{ value: null, disabled: false }, [Validators.required, Validators.maxLength(20), Validators.minLength(3)]],
      lastname: [{ value: null, disabled: false }, [Validators.required, Validators.maxLength(20), Validators.minLength(3)]],
      email: [null],
      paddress: [{ value: null, disabled: false }, [Validators.required]],
      emailcontrol: [{ value: null, disabled: false }, [Validators.required, Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      contactnumber: [{ value: null, disabled: false }, [Validators.required, Validators.pattern('[6-9]\\d{9}')]],
      alternametcontact: [{ value: null, disabled: false }, [Validators.maxLength(20), Validators.minLength(3), Validators.pattern('[a-zA-Z][a-zA-Z ]+')]],
      aldcontrol: false,
      uniqueid: Number,
      aladdress: [{ value: null, disabled: false }, [Validators.required]],
      designation: [{ value: null, disabled: false }, [Validators.required]],
    });



  }
  changeCheckBox(e, flag) {
    if (flag == 'update') {
      if (e.checked == true)
        this.updateemployeForm.controls['updatealaddress'].disable();
      else this.updateemployeForm.controls['updatealaddress'].enable();
    }
    if (flag == 'add') {
      if (e.checked == true)
        this.employeForm.controls['aladdress'].disable();
      else this.employeForm.controls['aladdress'].enable();
    }
  }
  onSubmit(f) {
    if (this.finaldata.length > 0)
      this.uniqid = this.finaldata[0].uniqueid + 1;
    f.uniqueid = this.uniqid;
    this.emplyedetails = this.finaldata;

    this.emplyedetails.splice(0, 0, f);
    this.emplyedetails['un']

    this.totalRecords = this.finaldata.length;
    this.storeData(JSON.stringify(this.emplyedetails));


    this.snackBar.open('Submitted Successfully', 'ok', {
      duration: 4000,
    });
    this.getData();

  }

  storeData(finaldata: string) {
    localStorage.clear();
    localStorage.setItem('EmployeeDetails', finaldata);
  }

  getData() {
    let data = localStorage.getItem('EmployeeDetails');
    if (data == null)
      this.finaldata = []
    else {
      this.finaldata = JSON.parse(data);
      this.dataSource = new MatTableDataSource<any>(this.finaldata);
      this.dataSource.paginator = this.paginator;
    }
  }
  deleteSelectedEmployee(id) {

    if (confirm('Are you sure that you want to Delete this Employee?'))
      this.finaldata.forEach((data, index) => {
        if (id == data.uniqueid) {
          this.finaldata.splice(index, 1);
          this.storeData(JSON.stringify(this.finaldata));
          this.getData();
          this.snackBar.open('Deleted Successfully', 'ok', {
            duration: 4000,
          });
        }
      });


  }
  showupdatevalue(rowvalue) {
    this.form = true;
    //console.log(e);
    //e = false;
    this.updateForm(rowvalue)
    if (rowvalue.aldcontrol == false)
      this.updateemployeForm.controls['updatealaddress'].enable();
  }

  updateForm(row) {

    this.updateemployeForm = this.fb.group({
      updatefirstname: [{ value: row.firstname, disabled: false }, [Validators.required, Validators.maxLength(20), Validators.minLength(3)]],
      updatelastname: [{ value: row.lastname, disabled: false }, [Validators.required, Validators.maxLength(20), Validators.minLength(3)]],
      updateemail: [null],
      updatepaddress: [{ value: row.paddress, disabled: false }, [Validators.required]],
      updateemailcontrol: [{ value: row.emailcontrol, disabled: false }, [Validators.required, Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      updatecontactnumber: [{ value: row.contactnumber, disabled: false }, [Validators.required, Validators.pattern('[6-9]\\d{9}')]],
      updatealternametcontact: [{ value: row.alternametcontact, disabled: false }, [Validators.maxLength(20), Validators.minLength(3), Validators.pattern('[a-zA-Z][a-zA-Z ]+')]],
      updatealdcontrol: row.aldcontrol,
      uniqueid: row.uniqueid,
      updatealaddress: [{ value: row?.aladdress, disabled: row.aldcontrol }, [Validators.required]],
      updatedesignation: [{ value: row.designation, disabled: false }, [Validators.required]],
    });
  }
  updatechangeCheckBox(e) {
    if (this.updateemployeForm.invalid) {
      this.snackBar.open('Please Fill Valid Value Before Updating', 'ok', {
        duration: 4000,
      });

    }
  }

  onUpdate(f) {
    this.form = false;
    let updatedata = this.updateemployeForm.controls["finalupdatedata"] as FormArray;
    this.finaldata.forEach((data, index) => {
      if (f.uniqueid == data.uniqueid) {
        data.firstname = f.updatefirstname;
        data.lastname = f.updatelastname;
        data.contactnumber = f.updatecontactnumber;
        data.designation = f.updatedesignation;
        data.emailcontrol = f.updateemailcontrol
        data.paddress = f.updatepaddress;
        data.aldcontrol = f.updatealdcontrol
        data.aladdress = f.updatealaddress
        this.storeData(JSON.stringify(this.finaldata))
        this.getData();
        this.snackBar.open('Updated Successfully', 'ok', {
          duration: 4000,
        });
      }
    })

  }

}
