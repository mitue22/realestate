interface Response {
    result: {
      title: string;
      propertyFor: string;
      cornerPlot:any;
      type: {
        _id:string;
        title: string;
      };
      state: {
        _id:string;
        name: string;
      };
      city: {
        _id:string;
        name: string; 
      };
      locality: string;
      address: string;
      description: string;
      email: string;
      phoneNo: string;
      pincode: string;
      builder:{
        _id:string,
        fname:string;
      };
};
    files: any[];
  }