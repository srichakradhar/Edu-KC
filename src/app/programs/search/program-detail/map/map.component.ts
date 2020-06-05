import {Component, ElementRef, NgZone, ViewChild, OnInit, AfterViewInit, Input} from '@angular/core';
import {} from 'googlemaps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {
  map;
  @ViewChild('mapElement') mapElement;
  @Input() location:string;
  public geo:google.maps.Geocoder;
  public coords ={
    lat:-34.397, lng: 150.644
  }
  constructor() {
    this.geo = new google.maps.Geocoder()
  }

  ngOnInit() {
    console.log(this.location);
    if (this.location){
      this.getAddress(this.location);
    }
  }

  getAddress(place) {
    this.geo.geocode({address:place}, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        // Lets assume that the first marker is the one we want
        console.log(results[0].geometry)
        this.coords = {lat :results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()};
      } else {
        console.log('Error in fecthing')
      }
      console.log(this.coords);
    })
  }

  ngAfterViewInit(): void {
    this.map = new google.maps.Map(
        this.mapElement.nativeElement,
        {
          center: this.coords,
          zoom: 8
    });
    const marker:google.maps.Marker = new google.maps.Marker ({
      map: this.map,
      position: this.coords,
    })  
  } 

}