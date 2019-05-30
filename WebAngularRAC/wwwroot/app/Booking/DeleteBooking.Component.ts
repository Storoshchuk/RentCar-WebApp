import { Component, OnInit } from '@angular/core'
import { BookingService } from '../Booking/Services/Booking.Service'
import { BookingModel } from '../Booking/BookingModel';
import { NgProgressService } from "ng2-progressbar";
import { Router, ActivatedRoute } from '@angular/router'
import { CarModel } from '../Cars/Car.Model';
import { CarService } from '../Cars/Services/Car.Service';
@Component({
    templateUrl: 'app/Booking/DeleteBooking.html',
    providers: [BookingService, CarService]
})


export class DeleteBooking {
    bookingmodel: BookingModel[];
    CarData: CarModel[];
    ID: string;
    constructor(private pService: NgProgressService, private _carservice: CarService, private _Route: Router, private _bookingservice: BookingService, private _routeParams: ActivatedRoute) {

    }

    ngOnInit(): void {
        this.ID = this._routeParams.snapshot.params['ID'];

        this._bookingservice.GetBookingbyBookID(this.ID)
            .subscribe(data => {
                if (data != null) {
                    this.bookingmodel = <BookingModel[]>data;
                }
            },
            error => {
                if (error) {
                    alert("Виникла помилка сервера, спробуйте пізніше !");
                }
            });

        this._carservice
            .GetAllCarsDetails()
            .subscribe(data => this.CarData = data,
            error => console.log(error),
            () => console.log('Get all complete'));

    }

    onSubmit() {
        if (confirm("Ви дійсно бажаєте видалити бронювання ?")) {
            this._bookingservice.DeletingBooking(this.ID)
                .subscribe(data => {
                    if (data != null) {
                        this.bookingmodel = <BookingModel[]>data;
                    }
                },
                error => {
                    if (error) {
                        alert("Виникла помилка сервера, спробуйте пізніше !");
                    }
                });
        }
    }



}