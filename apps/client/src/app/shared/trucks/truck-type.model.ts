export class TruckType {
    constructor(
        public name: string, 
        public loadCapacity: number, 
        public services: string,
        public pricePerMile: number,
    ) {}
}