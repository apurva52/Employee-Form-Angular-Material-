import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { DropdownModule } from 'primeng-lts/dropdown';
import { AppComponent } from './app.component';

import { InputTextareaModule } from 'primeng-lts/inputtextarea';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToolbarModule } from 'primeng-lts/toolbar';
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng-lts/table';
import { ButtonModule } from 'primeng-lts/button';
import { OverlayPanelModule } from 'primeng-lts/overlaypanel';
import { CardModule } from 'primeng-lts/card';
import { InputTextModule } from 'primeng-lts/inputtext';
import { PasswordModule } from 'primeng-lts/password';
import { ToastModule } from 'primeng-lts/toast';
import { CheckboxModule } from 'primeng-lts/checkbox';
import { ConfirmDialogModule } from 'primeng-lts/confirmdialog';
import { MatTableModule } from '@angular/material/table';

import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatToolbarModule,
    MatSnackBarModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    InputTextareaModule,
    ConfirmDialogModule,
    MatTableModule,
    MatSelectModule,
    MatPaginatorModule,
    DropdownModule,
    TableModule,
    AccordionModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    // primeng
    ToolbarModule,
    CheckboxModule,
    ButtonModule,
    OverlayPanelModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
