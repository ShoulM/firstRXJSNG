export class DataModel  {
  description: string;
  group: string;
  id: number;
  title: string;
  when: Date;
  constructor(object) {
    this.description = object.description;
    this.group = object.group;
    this.id = object.id;
    this.title = object.title;
    this.when = new Date(object.when);
  }
}
