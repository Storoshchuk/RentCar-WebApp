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
var Car_Service_1 = require("../Cars/Services/Car.Service");
var Booking_Service_1 = require("../Booking/Services/Booking.Service");
var router_1 = require("@angular/router");
var BookingComponent = /** @class */ (function () {
    function BookingComponent(_bookingservice, _Route) {
        this._bookingservice = _bookingservice;
        this._Route = _Route;
    }
    BookingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._bookingservice
            .GetAllCarsDetails()
            .subscribe(function (data) {
            if (data != null) {
                _this.CarData = data;
                _this.searchStr = " ";
                _this.searchStr = "";
            }
        }, function (error) {
            if (error) {
                alert("An Error has occured please try again after some time !");
            }
        });
    };
    BookingComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/Booking/Booking.html',
            providers: [Car_Service_1.CarService, Booking_Service_1.BookingService]
        }),
        __metadata("design:paramtypes", [Booking_Service_1.BookingService, router_1.Router])
    ], BookingComponent);
    return BookingComponent;
}());
exports.BookingComponent = BookingComponent;
//# sourceMappingURL=Booking.Component.js.map