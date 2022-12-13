import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand.model';
import { BrandService } from 'src/app/services/brand.service';
import { NgxSpinnerService } from "ngx-spinner";
import { GuitarService } from 'src/app/services/guitar.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})
export class HomeComponent implements OnInit {

  public brands !: Brand[];

  constructor(private brandService: BrandService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.brandService.getAll().subscribe(
      response => {
        this.brands = response;
        this.spinner.hide();
      }
    )
  }






}
