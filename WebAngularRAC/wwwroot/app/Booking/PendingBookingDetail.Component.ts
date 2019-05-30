import { Component } from '@angular/core'
import { BookingService } from '../Booking/Services/Booking.Service'
import { Router } from '@angular/router';
import { NgProgressService } from "ng2-progressbar";
import { BookingModel } from '../Booking/BookingModel';

@Component({
    templateUrl: 'app/Booking/PendingBookingDetails.html',
    providers: [BookingService]
})
export class PendingBookingComponent {
    bookingmodel: BookingModel[];

    constructor(private _bookingservice: BookingService, private pService: NgProgressService, private _Route: Router) {

    }

    ngOnInit() {
        this._bookingservice
            .GetAllPendingBookingDetails()
            .subscribe(data =>
            {
                if (data != null)
                {
                    this.bookingmodel = data;
                }
            },
            error =>
            {
                if (error) {
                    alert("Виникла помилка сервера, спробуйте пізніше !");
                }
            });
    }

    Delete(ID :any)
    {
        if (confirm("Ви впевнені, що хочете скасувати бронювання?"))
        {
            this._bookingservice.DeletingBooking(ID)
                .subscribe(data =>
                {
                    if (data == true)
                    {
                        alert("Бронювання скасовано успішно!");
                        this._Route.navigate(['AllBookingDetails']);
                    }
                    else
                    {
                        alert("Виникла помилка сервера, спробуйте пізніше !");
                    }
                },
                error =>
                {
                    if (error)
                    {
                        alert("Виникла помилка сервера, спробуйте пізніше !");
                    }
                });
        }
    }

    
}