import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { relative } from 'path';
import { Guitar } from 'src/app/models/guitar.model';
import { GuitarService } from 'src/app/services/guitar.service';

@Component({
  selector: 'app-guitars',
  templateUrl: './guitars.component.html',
  styleUrls: ['./guitars.component.css']
})
export class GuitarsComponent implements OnInit {

  public OpenGuitar: boolean = false;
  public guitars!: Guitar[];

  constructor(private guitarService: GuitarService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {



  }

  OnClickGuitar(id: number) {
    this.OpenGuitar = true;
    this.router.navigate(['/guitarItem/' + id], { relativeTo: this.route });
  }
}
