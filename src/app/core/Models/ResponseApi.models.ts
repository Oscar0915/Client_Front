export interface ResponseApiModel {
  errorMessage: string;
  successMessage: string;
  data: ClientDataModel;
  status: string;
}

export interface ClientDataModel {
  sharedKey: string;
  businessId: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  startDate: string;
  endDate: string;
}


export interface ResponseApiExporModel {
  errorMessage: string;
  successMessage: string;
  data: string;
  status: string;
}