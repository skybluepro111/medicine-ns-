import { Component, OnInit } from '@angular/core';
import { RadCalendar, CalendarViewMode } from "nativescript-telerik-ui-pro/calendar";

@Component({
	selector: 'calendar',
	moduleId: module.id,
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {
	private _viewMode;
	constructor() {
		this._viewMode = CalendarViewMode.Week;
	 }

	ngOnInit() { }
}