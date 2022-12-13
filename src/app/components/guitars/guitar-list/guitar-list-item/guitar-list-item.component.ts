import { Component, OnInit, Input } from '@angular/core';
import { Guitar } from 'src/app/models/guitar.model';

@Component({
  selector: 'app-guitar-list-item',
  templateUrl: './guitar-list-item.component.html',
  styleUrls: ['./guitar-list-item.component.css']
})
export class GuitarListItemComponent implements OnInit {

  @Input() guitar!: Guitar;

  constructor() { }

  ngOnInit(): void {

  }

}
