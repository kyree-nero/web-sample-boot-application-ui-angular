import { Sample } from './sample';

export class SampleView {
  errors: string[] = []; 
  sample: Sample;
  updateEnabled: boolean;
  alteredContent: string;
}