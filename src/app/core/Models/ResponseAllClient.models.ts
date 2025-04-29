export interface ClientDataModel {
    sharedKey: string;
    businessId: string;
    email: string;
    phoneNumber: string;
    createdAt: string;
    startDate: string;
    endDate: string;
}

export interface ResponseAllClientModel {
    errorMessage: string;
    successMessage: string;
    data: ClientDataModel[];
    status: string;
}

