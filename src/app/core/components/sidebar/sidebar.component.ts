import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http/http.service';
import { SidebarToggleService } from '../../services/sidebar-toggle/sidebar-toggle.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isSidebarOpened = false;

  constructor(private sidebarService: SidebarToggleService, private http: HttpService) { }

  ngOnInit(): void {
    this.sidebarService.isSidebarOpened$.subscribe(isSidebarOpened => this.isSidebarOpened = isSidebarOpened);
  }

  sidebarToggle() {
    this.sidebarService.toggle();
  }

}

