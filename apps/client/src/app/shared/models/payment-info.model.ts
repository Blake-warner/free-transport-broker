export class PaymentInfo {
    constructor(
        public name: string, 
        public cardNumber: string, 
        public expDate: string, 
        public securityCode: string
    ){}
}