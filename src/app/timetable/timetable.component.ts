import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Timetable } from '../_timetable/timetable';
import { Renderer } from '../_timetable/renderer';
import { Scope } from '../_timetable/_models/scope';
import { SutRegService } from '../serveice/sut-reg.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {

  @ViewChild('timetable') element: ElementRef;
  selector;
  timetable: Timetable;
  renderer: Renderer;
  scope: Scope;
  locations = [];
  events = [];
  data = [];
  @ViewChild('modal') modal: ElementRef
  @ViewChild('findbtn') findbtn: ElementRef
  regDataAll: any = []

  constructor(private SutReg: SutRegService, private http: HttpClient) {
    this.timetable = new Timetable();
  }

  ngOnInit() {
    this.selector = this.element.nativeElement;

    this.timetable.setScope(8, 8);
    this.timetable.addLocations(['จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์']);

    this.renderer = new Renderer(this.timetable);
    this.renderer.draw(this.selector);

  }

  logTimetable(){
    console.log(this.timetable);
    
  }

  addTimeTable(data) {
    console.log(data);
    for (let i = 0; i < data.times.length; i++) {
      //console.log(data.times[i]);
      var startEnd = data.times[i].time.split('-')

      var startTime:Date = new Date(); 
      startTime.setHours(startEnd[0].split(':')[0],startEnd[0].split(':')[1],0)

      var endTime:Date = new Date(); 
      endTime.setHours(startEnd[1].split(':')[0],startEnd[1].split(':')[1],0)
      

      this.timetable.addEvent(data.name, data.times[i].day, startTime, endTime, { url: '#' });
    }

    this.renderer.draw(this.selector);

  }

  popUp() {
    if (this.modal.nativeElement.classList[1] == 'is-active')
      this.modal.nativeElement.classList.remove('is-active')
    else
      this.modal.nativeElement.classList.add('is-active')

  }

  getAllData(body) {
    console.log(body);

    this.findbtn.nativeElement.classList.add('is-loading')
    this.SutReg.getData(body.courseid, body.year, body.term).subscribe(
      data => {
        //console.log(data);
        for (let i = 0; i < data['length']; i++) {
          //console.log(data[i].times);
          for (let j = 0; j < data[i].times['length']; j++) {
            switch (data[i].times[j].day) {
              case "Mo":
                data[i].times[j].day = "จันทร์"
                break;
              case "Tu":
                data[i].times[j].day = "อังคาร"
                break;
              case "We":
                data[i].times[j].day = "พุธ"
                break;
              case "Th":
                data[i].times[j].day = "พฤหัสบดี"
                break;
              case "Fr":
                data[i].times[j].day = "ศุกร์"
                break;
              case "Sa":
                data[i].times[j].day = "เสาร์"
                break;
              case "Su":
                data[i].times[j].day = "อาทิตย์"
                break;
            }
          }
        }
        this.regDataAll = data;
        this.findbtn.nativeElement.classList.remove('is-loading')
        console.log(this.regDataAll);
      },
      error => {
        console.log(error);
        this.findbtn.nativeElement.classList.remove('is-loading')
      }
    );

  }

}
