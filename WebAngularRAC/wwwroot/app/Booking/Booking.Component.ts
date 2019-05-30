import { Component, OnInit } from '@angular/core';
import { BookingModel } from '../Booking/BookingModel';
import { CarService } from '../Cars/Services/Car.Service';
import { BookingService } from '../Booking/Services/Booking.Service';
import { CarModel } from '../Cars/Car.Model';
import { Router } from '@angular/router';
import { NgProgressService } from "ng2-progressbar";
@Component({
    templateUrl: 'app/Booking/Booking.html',
    providers: [CarService, BookingService]
})

export class BookingComponent implements OnInit {
    CarData: CarModel[];
    public searchStr: string;

    constructor(private _bookingservice: BookingService, private _Route: Router) {

    }

    ngOnInit() {
        this._bookingservice
            .GetAllCarsDetails()
            .subscribe
            (
            data => {
                if (data != null)
                {
                    this.CarData = data;
                    this.searchStr = " ";
                    this.searchStr = "";
                }
            },
            error => {
                if (error) {
                    alert("Виникла помилка сервера, спробуйте пізніше !");
                }
            });

    }
}