import { Schema, model, Document } from "mongoose";

interface IEmployee extends Document {
  firstName: string,
  lastName: string,
  email: string,
  number: string,
  gender: string,
  photo: string,
}

const EmployeeSchema = new Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  email: { type: String, require: true },
  number: { type: String, require: true },
  gender: { type: String, require: true },
  photo: { type: String, require: true }
},
{
  versionKey: false,
  id: true,
  toJSON: {
    transform(doc, ret){
      ret.id = ret._id
      delete ret._id
    }
  }
});

export const Employee = model<IEmployee>("Employee", EmployeeSchema);
