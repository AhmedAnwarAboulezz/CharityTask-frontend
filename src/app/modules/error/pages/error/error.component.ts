import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/shared/storage/storage.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  errorNumber: any;

  constructor(private activeRoute: ActivatedRoute, private localStorage: StorageService) { }

  ngOnInit(): void {
    //this.localStorage.clearStorage();
    this.errorNumber = this.activeRoute.snapshot.paramMap.get('errorNumber');
  }
}
