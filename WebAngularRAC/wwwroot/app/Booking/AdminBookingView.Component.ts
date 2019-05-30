import { Component } from '@angular/core'
import { AdminBookingViewService } from '../Booking/Services/AdminBookingView.Service'
import { Router } from '@angular/router';
import { NgProgressService } from "ng2-progressbar";
import { BookingModel } from '../Booking/BookingModel';

@Component({
    templateUrl: 'app/Booking/AllAdminBookingDetails.html',
    providers: [AdminBookingViewService]
})

export class AdminBookingViewComponent
{
    bookingmodel: BookingModel[];


    constructor(private _bookingservice: AdminBookingViewService, private pService: NgProgressService, private _Route: Router)
    {

    }

    ngOnInit()
    {
        this._bookingservice
            .GetAllBooking()
            .subscribe(data =>
            {
                if (data != null)
                {
                    this.bookingmodel = data;
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


    Delete(BookingID: string)
    {
        if (confirm("Ви дійсно бажаєте видалити бронювання ?"))
        {
            this._bookingservice.DeletingBooking(BookingID)
                .subscribe(data => {
                    this._bookingservice
                        .GetAllBooking()
                        .subscribe(data => {
                            if (data != null) {
                                this.bookingmodel = data;
                            }
                        },
                            error => {
                                if (error) {
                                    alert("Виникла помилка сервера, спробуйте пізніше !");
                                }
                            });
                },
                error => {
                    if (error) {
                        



("Виникла помилка сервера, спробуйте пізніше !");
                    }
                });
        }
    }

}