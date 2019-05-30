import { Component, OnInit } from '@angular/core'
import { CarModel } from '../Cars/Car.Model'
import { CarService } from '../Cars/Services/Car.Service'
import { NgProgressService } from "ng2-progressbar";
import { Router } from '@angular/router'
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

@Component({
    templateUrl: 'app/Cars/Car.html',
    providers: [CarService]
})

export class CarComponent {
    carmodel: CarModel = new CarModel();
    submitted: boolean = false;
    status: boolean;
    private username: string = "";
    private data: any;
    emailPattern: string = '/^([a-zA-Z0-9])+([a-zA-Z0-9._%+-])+@([a-zA-Z0-9_.-])+\.(([a-zA-Z]){2,6})$/';


    private actionUrl: string;
    selectedCar: string;
    CarData: CarModel[];
    private token: string = "";

    private fileList: FileList;

    constructor(private http: Http, private _carservice: CarService, private pService: NgProgressService, private _Route: Router)
    {
        this.actionUrl = 'http://localhost:56483/AddCarsPhoto/UploadFiles';

        this.data = JSON.parse(localStorage.getItem('AdminUser'));
        this.token = this.data.token;
        this.username = this.data.username
    }

        fileChange(event: any) {
        let fileList: FileList = event.target.files;
        this.fileList = fileList;
    }

    onSubmit() {
        this.pService.start();
        var formdata = this.carmodel;
        formdata.Username = this.username;
        this._carservice.AddCar(formdata).subscribe(
            data => {
                if (data == true) {
                    if (this.fileList !== null)
                        this.onSubmit2();
                    alert("Your Data Saved Successfully ");
                    //this._Route.navigate(['UploadCarPhoto']);
                }
                else {
                    alert("Problem While Adding Cars");
                }
            },
            error =>
            {
                if (error)
                {
                    alert("An Error has occured please try again after some time !");
                }
            });
        this.pService.done();
    }

    onSubmit2() {

            let fileList: FileList = this.fileList;
            if (fileList.length > 0) {
                let file: File = fileList[0];
                let formData: FormData = new FormData();
                formData.append('uploadFile', file, file.name);
                formData.append('SelectedCarID', "1");
                let headers = new Headers();
                headers.append('Token', `${this.token}`);
                let options = new RequestOptions({ headers: headers });
                this.http.post(`${this.actionUrl}`, formData, options)
                    .map(res => res.json())
                    .subscribe
                    (
                    data => {
                        if (data == true) {
                            alert("Фото успішно завантажено ");
                            this._Route.navigate(['AllCar']);
                        }
                        else {
                            alert("Photo is Already Uploaded Successfully");
                        }
                    },
                    error => {
                        if (error) {
                            alert("An Error has occured please try again after some time !");
                        }
                    })
            }
        
    }



    CheckModelNameExist()
    {
       

        var cars = this.carmodel;
        if (cars.Model_Name != null) {
            this._carservice.validateModelName(cars.Model_Name).subscribe
                (
                data => {
                    this.status = <boolean>data;

                    if (this.status == false) {
                        this.carmodel.Model_Name = "";
                        alert("ModelName Already Exits");
                    }
                    else {

                    }
                },
                error =>
                {
                    if (error)
                    {
                        alert("An Error has occured please try again after some time !");
                    }
                });
        }
    }



}