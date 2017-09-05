export class Items {
    constructor
      (
        public id: string,
        public name: string,
        public type: string,
        public dosage: string,
        public count: string,
        public note:string,
        public startDate: Date,
        public endDate: Date,
        public startTime: Date,
        public meal: string,
        public isDay: boolean,
        public day: string
      )
    {}   
}