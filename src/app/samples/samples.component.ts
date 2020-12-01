import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Sample } from './sample';
import { SampleView } from './sample.view';
import { SampleService } from './sample.service';


@Component({ 
  selector: 'samples',
  templateUrl: './samples.component.html',
  styleUrls: ['./samples.component.css']
})


export class SamplesComponent  implements OnInit{
  samples: SampleView[];
  addEnabled:boolean;
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
               sampleView.updateEnabled = false;
               sampleViews.push(sampleView);
             }
             this.samples = sampleViews;
             console.log('in subscribe --end');
        }
     )
       
        console.log('in service -- getAllSamples ');

}
  
  delete (id:number  ) : void {
    console.log('deleting ' + id);
    this.sampleService.delete(id)
        .subscribe(
            data => {
              console.log('in subscribe --start');

              this.samples = new Array<SampleView>();

              this.sampleService.getSamples()
                .subscribe(
                  data => {
                    console.log('xbx');
                    console.log(data);

                    for(var i = 0;i<data.body.length; i++){
                      const sampleView:SampleView = new SampleView();
                      const sample:Sample = new Sample();
                      sampleView.sample = data.body[i];
                      sampleView.updateEnabled = false;
                      this.samples.push(sampleView);
                    }
                   // this.samples = data.body;
                  }
                 );
              console.log('in subscribe --end');
          }
        );
  }
  
  
  add () : void {
    console.log(this.newContent);
    this.sampleService.add(this.newContent)
        .subscribe(
            data => {
              console.log('in subscribe --start');
              this.samples = new Array<SampleView>();

              this.sampleService.getSamples()
                .subscribe(
                  data => {
                    console.log('xbx');
                    console.log(data);

                    for(var i = 0;i<data.body.length; i++){
                      const sampleView:SampleView = new SampleView();
                      const sample:Sample = new Sample();
                      sampleView.sample = data.body[i];
                      sampleView.updateEnabled = false;
                      this.samples.push(sampleView);
                    }
                   // this.samples = data.body;
                  }
                 );
              console.log('in subscribe --end');
          }
         );
         this.newContent = null;
         this.addEnabled = false;
  }

  update (id:number) : void {
      console.log('id ' + id);
      var updatedContent = null;
      var currentVersion = null;
      for(var i = 0;i<this.samples.length; i++){
        if(this.samples[i].sample.id == id){
          updatedContent = this.samples[i].sample.content;
          currentVersion = this.samples[i].sample.version;
        }
      }
      this.sampleService.update(id, updatedContent, currentVersion)
        .subscribe(
            data => {
              console.log('in subscribe --start');

              this.samples = new Array<SampleView>();

              this.sampleService.getSamples()
                .subscribe(
                  data => {
                    console.log('xbx');
                    console.log(data);

                    for(var i = 0;i<data.body.length; i++){
                      const sampleView:SampleView = new SampleView();
                      const sample:Sample = new Sample();
                      sampleView.sample = data.body[i];
                      sampleView.updateEnabled = false;
                      this.samples.push(sampleView);
                    }
                   // this.samples = data.body;
                  }
                 );
              console.log('in subscribe --end');
          }
         );
  }
  
}

