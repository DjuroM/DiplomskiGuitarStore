import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  title = 'ng-carousel-demo';

  images = ["../../../assets/guitarist-electric-guitar-bnt4ubnvmirogv4i.jpg",
    "../../../assets/17854-guitarist-guitar-musical-instrument-music-4k.jpg",
    "../../assets/cropped-Fatt-ES175-Guitar-1920x1080-34PercentQuality.jpg"];
  constructor(config: NgbCarouselConfig) {
    config.interval = 10000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = true;
  }

  ngOnInit(): void {
  }

}
