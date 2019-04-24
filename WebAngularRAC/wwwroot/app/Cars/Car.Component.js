"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Car_Model_1 = require("../Cars/Car.Model");
var Car_Service_1 = require("../Cars/Services/Car.Service");
var ng2_progressbar_1 = require("ng2-progressbar");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var CarComponent = /** @class */ (function () {
    function CarComponent(http, _carservice, pService, _Route) {
        this.http = http;
        this._carservice = _carservice;
        this.pService = pService;
        this._Route = _Route;
        this.carmodel = new Car_Model_1.CarModel();
        this.submitted = false;
        this.username = "";
        this.emailPattern = '/^([a-zA-Z0-9])+([a-zA-Z0-9._%+-])+@([a-zA-Z0-9_.-])+\.(([a-zA-Z]){2,6})$/';
        this.token = "";
        this.actionUrl = 'http://localhost:56483/AddCarsPhoto/UploadFiles';
        this.data = JSON.parse(localStorage.getItem('AdminUser'));
        this.token = this.data.token;
        this.username = this.data.username;
    }
    CarComponent.prototype.fileChange = function (event) {
        var fileList = event.target.files;
        this.fileList = fileList;
    };
    CarComponent.prototype.onSubmit = function () {
        var _this = this;
        this.pService.start();
        var formdata = this.carmodel;
        formdata.Username = this.username;
        this._carservice.AddCar(formdata).subscribe(function (data) {
            if (data == true) {
                if (_this.fileList !== null)
                    _this.onSubmit2();
                alert("Your Data Saved Successfully ");
                //this._Route.navigate(['UploadCarPhoto']);
            }
            else {
                alert("Problem While Adding Cars");
            }
        }, function (error) {
            if (error) {
                alert("An Error has occured please try again after some time !");
            }
        });
        this.pService.done();
    };
    CarComponent.prototype.onSubmit2 = function () {
        var _this = this;
        var fileList = this.fileList;
        if (fileList.length > 0) {
            var file = fileList[0];
            var formData = new FormData();
            formData.append('uploadFile', file, file.name);
            formData.append('SelectedCarID', "1");
            var headers = new http_1.Headers();
            headers.append('Token', "" + this.token);
            var options = new http_1.RequestOptions({ headers: headers });
            this.http.post("" + this.actionUrl, formData, options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                if (data == true) {
                    alert("Photo Uploaded Successfully ");
                    _this._Route.navigate(['AllCar']);
                }
                else {
                    alert("Photo is Already Uploaded Successfully");
                }
            }, function (error) {
                if (error) {
                    alert("An Error has occured please try again after some time !");
                }
            });
        }
    };
    CarComponent.prototype.CheckModelNameExist = function () {
        var _this = this;
        var cars = this.carmodel;
        if (cars.Model_Name != null) {
            this._carservice.validateModelName(cars.Model_Name).subscribe(function (data) {
                _this.status = data;
                if (_this.status == false) {
                    _this.carmodel.Model_Name = "";
                    alert("ModelName Already Exits");
                }
                else {
                }
            }, function (error) {
                if (error) {
                    alert("An Error has occured please try again after some time !");
                }
            });
        }
    };
    CarComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/Cars/Car.html',
            providers: [Car_Service_1.CarService]
        }),
        __metadata("design:paramtypes", [http_1.Http, Car_Service_1.CarService, ng2_progressbar_1.NgProgressService, router_1.Router])
    ], CarComponent);
    return CarComponent;
}());
exports.CarComponent = CarComponent;
//# sourceMappingURL=Car.Component.js.map