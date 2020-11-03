import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { AgmOverlays } from "agm-overlays";
import { AgmDirectionModule } from 'agm-direction';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyADwNJu0uE8Bx6LH6HhhQd7_dfcVZE9pOk  ',
      
      libraries: ['places', 'geometry', 'drawing'],
      
    }),
    AgmDirectionModule,
    GooglePlaceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
