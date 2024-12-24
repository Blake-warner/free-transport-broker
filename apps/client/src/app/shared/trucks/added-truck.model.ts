
export class AddedTruck {
    constructor(
        public type: string, 
        public minCapacity: number, 
        public maxCapacity: number, 
        public serviceType: string,
        public image: File
    ) {}
}