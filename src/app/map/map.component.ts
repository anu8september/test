import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, NgZone, OnInit, ViewChild ,AfterViewInit} from '@angular/core';
import { MouseEvent } from '@agm/core';
declare var google: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private geoCoder;
  country: string;
  latitude: number;
  longitude: number;
  zoom: number;
  address: any;
  latitude1: number=30.704649;
  longitude1: number=76.717873;
  show:boolean=false
  address1: any;
  dir: { search: { lat: any; lng: any; }; destination: { lat: any; lng: any; }; };

  constructor( private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
    ) { }
    @ViewChild('search',{static: false})
    public searchElementRef: ElementRef;
    @ViewChild('search1',{static: false})
     public dropElementRef: ElementRef;  
     ngOnInit() {
    this.setCurrentLocation();
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
   let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          place.address_components.forEach(key => {
            if (key.types[0] === 'country') {
               this.country = key.long_name
             console.log("addres",this.country)
             }
            }) 
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
           this.searchElementRef.nativeElement.value=this.address;
        });
      });
      let autocomplete1 = new google.maps.places.Autocomplete(this.dropElementRef.nativeElement
      )
        ;
      autocomplete1.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete1.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          //set latitude, longitude and zoom
          this.latitude1 = place.geometry.location.lat();
          this.longitude1 = place.geometry.location.lng();
          this.zoom = 12;
          this.searchElementRef.nativeElement.value = this.address;
          // set latitude, longitude and zoom

        });
      });
    });



  }
  onMouseOver(infoWindow, gm) {
    // console.log("gm",gm)
    if (gm.lastOpen != null) {
        gm.lastOpen.close();
    }
  gm.lastOpen = infoWindow;
console.log("====")
    infoWindow.open();
}
onMouseOver1(infoWindow, gm) {
  // console.log("gm",gm)
  if (gm.lastOpen != null) {
      gm.lastOpen.close();
  }
gm.lastOpen = infoWindow;
console.log("====")
  infoWindow.open();
}
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
        console.log("currentLOcation")
        this.getAddress(this.latitude, this.longitude);
        this.getAddress1(this.latitude1, this.longitude1);

      });
    }
  }
  getDirection() {
    if (this.longitude && this.longitude && this.latitude1 && this.longitude1) {
      this.show = true
      this.dir = {
        search: { lat: (this.latitude), lng: (this.longitude) },
        destination: { lat: this.latitude1, lng: this.longitude1 }
      }

    } 
  }
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {

      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
          results[0].address_components.forEach(key => {
            if (key.types[0] === 'country') {
               this.country = key.long_name
             console.log("addres",this.country)
             }
          
 
           })
          this.searchElementRef.nativeElement.value = this.address;
          console.log("search", this.address)

        } else {
          // window.alert('No results found');
        }
      } else {
      }



    });
  }
  markerDragEnds($event: MouseEvent) {
    this.latitude1 = $event.coords.lat;
    this.longitude1 = $event.coords.lng;
    this.getAddress1(this.latitude1, this.longitude1);
    this.dropElementRef.nativeElement.value = this.address1;

  }

  markerDragEnd($event: MouseEvent) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
    this.searchElementRef.nativeElement.value = this.address;
    
  }
  getAddress1(latitude1, longitude1) {
    this.geoCoder.geocode({ 'location': { lat: latitude1, lng: longitude1 } }, (results, status) => {

      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address1 = results[0].formatted_address;
          this.dropElementRef.nativeElement.value = this.address1;
          console.log("addresss drop", this.address1)
          // this.calculateDistance()
        }
      }
    });
  }

}

