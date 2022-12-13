import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Guitar } from 'src/app/models/guitar.model';
import { GuitarService } from 'src/app/services/guitar.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-guitar-list',
  templateUrl: './guitar-list.component.html',
  styleUrls: ['./guitar-list.component.css']
})
export class GuitarListComponent implements OnInit, OnDestroy {

  public guitars!: Guitar[];
  public fakeGuitars!: Guitar[];
  public fakeGuitarsCounter = 0;

  length = 100;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent!: PageEvent;

  private sub!: Subscription;
  public selectedBrand: string = 'none';
  public selectedGuitarType: string = 'none';



  constructor(private guitarService: GuitarService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService) { }


  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }




  ngOnInit(): void {
    this.spinner.show();

    if (this.route.snapshot.queryParams['type'] == 'guitarType') {

      this.selectedGuitarType = this.route.snapshot.queryParams['id'];
      this.guitarService.getAllByType(this.route.snapshot.queryParams['id']).subscribe(
        response => {
          this.guitars = response
          this.fakeGuitars = this.guitars.slice(0, 5);
          this.length = this.guitars.length;
          this.spinner.hide();
        }
      );
    } else if (this.route.snapshot.queryParams['type'] == 'brand') {
      this.selectedBrand = this.route.snapshot.queryParams['id'];

      this.guitarService.getAllByBrand(this.route.snapshot.queryParams['id']).subscribe(
        response => {
          this.guitars = response
          this.fakeGuitars = this.guitars.slice(0, 5);
          this.length = this.guitars.length;
          this.spinner.hide();
        }
      );
    } else if (this.route.snapshot.queryParams['type'] == 'all') {
      this.guitarService.getAll().subscribe(
        response => {
          this.guitars = response;
          this.fakeGuitars = this.guitars.slice(0, 5);
          this.length = this.guitars.length;
          this.spinner.hide();
        }
      )
    }

    this.sub = this.guitarService.isChanged.subscribe(
      Response => {
        this.spinner.show();
        this.fakeGuitars = Response;
        this.spinner.hide();
      }
    )


  }
  OnPagginationEvent(event: PageEvent) {
    this.spinner.show();


    setTimeout(() => {
      let pageIndex = event.pageIndex;
      let previousPageIndux = event.previousPageIndex!;
      if (pageIndex > previousPageIndux) {

        this.fakeGuitarsCounter += 5;
        this.guitarService.PagginatorGuitar(this.guitars, this.fakeGuitarsCounter, this.fakeGuitarsCounter + 5);
      } else {
        this.fakeGuitarsCounter -= 5;
        this.guitarService.PagginatorGuitar(this.guitars, this.fakeGuitarsCounter, this.fakeGuitarsCounter + 5);
      }
      this.spinner.hide();

    }, 500);


  }


  OnFilter() {
    this.spinner.show();


    let brandId = this.selectedBrand == 'none' ? 0 : Number.parseInt(this.selectedBrand)
    let guitarTypeID = this.selectedGuitarType == 'none' ? 0 : Number.parseInt(this.selectedGuitarType)

    this.fakeGuitarsCounter = 0;

    if (brandId != 0 && guitarTypeID != 0) {

      this.guitarService.getAllByTypeAndBrand(brandId, guitarTypeID).subscribe(
        response => {
          this.guitars = response;
          this.length = this.guitars.length;
          this.guitarService.PagginatorGuitar(this.guitars, this.fakeGuitarsCounter, this.fakeGuitarsCounter + 5)
          this.spinner.hide();
        }
      )
    } else if (brandId == 0 && guitarTypeID != 0) {
      this.guitarService.getAllByType(guitarTypeID).subscribe(
        response => {
          this.guitars = response;
          this.length = this.guitars.length;
          this.guitarService.PagginatorGuitar(this.guitars, this.fakeGuitarsCounter, this.fakeGuitarsCounter + 5)
          this.spinner.hide();
        }
      )
    } else if (guitarTypeID == 0 && brandId != 0) {
      this.guitarService.getAllByBrand(brandId).subscribe(
        response => {
          this.guitars = response;
          this.length = this.guitars.length;
          this.guitarService.PagginatorGuitar(this.guitars, this.fakeGuitarsCounter, this.fakeGuitarsCounter + 5)
          this.spinner.hide();
        }
      )
    } else {
      this.guitarService.getAll().subscribe(
        response => {
          this.guitars = response;
          this.length = this.guitars.length;
          this.guitarService.PagginatorGuitar(this.guitars, this.fakeGuitarsCounter, this.fakeGuitarsCounter + 5)
          this.spinner.hide();
        }
      )
    }


  }

}
