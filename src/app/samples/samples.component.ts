import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Sample } from './sample';
import { SampleView } from './sample.view';
import { SampleService } from './sample.service';
import { SampleAddView } from './sample.add.view';


@Component({ 
  selector: 'samples',
  templateUrl: './samples.component.html',
  styleUrls: ['./samples.component.css']
})


export class SamplesComponent  implements OnInit{
  samples: SampleView[];
  addSample: SampleAddView ;
  //addErrors: string[] = [];
  //addEnabled:boolean;
  @Input('newContent') newContent: string;
  @Input('updateId') updateId: number;
  
  constructor(
      private sampleService: SampleService
  ) {

 
  }
  
  ngOnInit(){
      console.log('On init');
      this.postInitialSamples();
      console.log('On init end');
      this.addSample = {
        errors: null,
        content: null,
        addEnabled: false
      };
   } 
  
postInitialSamples(): void {
    this.sampleService.getSamples()
        .subscribe(
       data => {
   
           console.log('in subscribe --start');
           console.log(data);
           console.log(data.headers);
           
          
             var sampleViews:SampleView[] = new Array<SampleView>();
             for(var i = 0;i<data.body.length; i++){
               const sampleView:SampleView = new SampleView();
               const sample:Sample = new Sample();
               sampleView.sample = data.body[i];
               sampleView.alteredContent = sampleView.sample.content;
               sampleView.updateEnabled = false;
               sampleViews.push(sampleView);
             }
             this.samples = sampleViews;
             console.log('in subscribe --end');
        }
     )
       
        console.log('in service -- getAllSamples ');

}
  
  delete (id: number ) : void {
    console.log('deleting ' + id);
    this.sampleService.delete(id)
        .subscribe(
            data => {
              console.log('in subscribe --start');

              this.postInitialSamples();
              console.log('in subscribe --end');
          }
        );
  }
  
  
  add () : void {
    console.log(this.newContent);
    //this.sampleService.add(this.newContent, this.addErrors)
    this.addSample.content = this.newContent;
    this.sampleService.add(this.addSample)
        .subscribe(
            data => {
              console.log('in subscribe --start');
             
              if(data.length == 0){
                //We got an error
                console.log("errored in add")
                //console.log('errors is now ' + this.addErrors.length)
                console.log('errors is now ' + this.addSample.errors.length)
              }else{
                 this.postInitialSamples();
                 this.newContent = null;
                 this.addSample.addEnabled = false;
              }
              console.log('in subscribe --end');
          }
         );
        
  }

  cancelUpdate (sampleView: SampleView) : void {
    sampleView.updateEnabled = false; 
    sampleView.errors = [];

    sampleView.alteredContent = sampleView.sample.content;

  }

  update (id:number) : void {
      //console.log('id ' + id);
      console.log("..." +id);
      var updatedContent = null;
      var currentVersion = null;
      var updateCandidate:SampleView = null;
      for(var i = 0;i<this.samples.length; i++){
        if(this.samples[i].sample.id == id){
          updatedContent = this.samples[i].alteredContent;
          currentVersion = this.samples[i].sample.version;
          updateCandidate = this.samples[i];
        }
      }
      //this.sampleService.update(id, updatedContent, currentVersion)
      this.sampleService.update(updateCandidate)
        .subscribe(
            data => {
              console.log('in subscribe --start');
              console.log(data);
              if(data.length == 0){
                //We got an error
                 
              }else{
                this.postInitialSamples();
              }
              console.log('in subscribe --end');
          }
         );
  }
  
}

