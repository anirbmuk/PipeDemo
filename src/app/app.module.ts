import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TextShortener } from './pipe/text-shorten.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TextShortener
  ],
  imports: [
  BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
