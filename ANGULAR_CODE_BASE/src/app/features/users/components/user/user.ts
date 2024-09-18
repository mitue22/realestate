export interface User {
    id:any,
    fname:string,
    lname:string,
    userName:string,
    email:string,
    phoneNo:string,
    password:string,
    state: {
        _id:string;
        name: string;
      };
    city: {
        _id:string;
        name: string;
      };
    role:string,
    pincode:string,
    usertype:string,
    isAdmin:boolean,
    status:boolean,
    updatedOn:Date,
    createdOn:Date,
  }
  
  export interface Role {
    id: any;
    name: string;
  }
  