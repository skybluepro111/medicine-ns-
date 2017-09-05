import { Component, OnInit } from '@angular/core';
import { TimePicker } from "ui/time-picker";
import { DatePicker } from "ui/date-picker";
import { Page } from "ui/page";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";

@Component({
	selector: 'time',
	moduleId: module.id,
	templateUrl: './time.component.html',
	styleUrls: ['./time.component.css']
})

export class TimeComponent implements OnInit {

	constructor(private params: ModalDialogParams, private page: Page) {
		this.page.on("unloaded", () => {
			this.params.closeCallback();
		});
	}
	ngOnInit() {
		
	}

	 onPickerLoaded(args) {
		const date = new Date();
        let timePicker = <TimePicker>args.object;
        timePicker.hour = date.getHours();
        timePicker.minute = date.getMinutes();
    }

	 public submit(args) {
		let timePicker: TimePicker = <TimePicker>this.page.getViewById<TimePicker>("timePicker");
		console.log("timepicker", timePicker.time)
	    this.params.closeCallback(timePicker.time);
	}
}