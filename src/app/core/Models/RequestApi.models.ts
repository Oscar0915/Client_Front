export class RequestApiModel {
  token: string;
  data: RequestApiData;

  constructor(token: string, data: RequestApiData) {
    this.token = token;
    this.data = data;
  }
}

export class RequestApiData {
  businessId: string;
  email: string;
  phoneNumber: string;
  startDate: Date;
  endDate: Date;

  constructor( businessId: string, email: string, phoneNumber: string, startDate: string, endDate: string ) {
    this.businessId = businessId;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.startDate = new Date(startDate);
    this.endDate = new Date(endDate);
  }
}


export class RequestApiSearchModel {
  token: string;
  data: string;

  constructor(token: string, data: string) {
    this.token = token;
    this.data = data;
  }
}