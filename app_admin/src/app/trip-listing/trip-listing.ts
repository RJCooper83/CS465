import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCardComponent } from '../trip-card/trip-card';
import { AuthenticationService } from '../services/authentication';
import { TripDataService } from '../services/trip-data';
import { Trip } from '../models/trip';

import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.html',
  styleUrls: ['./trip-listing.css'],
  providers: [TripDataService]
})

export class TripListingComponent implements OnInit {
  trips!: Trip[];
  message: string = '';

  constructor(
    private tripDataservice: TripDataService,
    private authenticationService: AuthenticationService,
    private router: Router
    ) {
    console.log('trip-listing constructor');
  }
  public addTrip(): void {
  console.log('Add Trip clicked');
  this.router.navigate(['/add-trip']);
  }

  private getStuff(): void {
    this.tripDataservice.getTrips()
    .subscribe({
      next: (value: any) => {
        this.trips = value;
        if(value.length > 0)
        {
          this.message = 'There are ' + value.length + ' trips available.';
        }
        else{
          this.message = 'There were no trips retrieved from the database';
        }
        console.log(this.message);
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      }
    })
  }

  public deleteTrip(tripCode: string): void {
  if (confirm('Are you sure you want to delete this trip?')) {
    this.tripDataservice.deleteTrip(tripCode).subscribe({
      next: () => {
        this.trips = this.trips.filter(t => t.code !== tripCode);
        console.log('Trip deleted:', tripCode);
      },
      error: (err: any) => {
        console.error('Delete failed:', err);
      }
    });
  }
}

public isLoggedIn(): boolean {
  return this.authenticationService.isLoggedIn();
}

  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();    
  }

}
