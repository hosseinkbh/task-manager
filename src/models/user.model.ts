import {ModelDefinition, Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument, SchemaTimestampsConfig} from "mongoose";
import paginate from "mongoose-paginate-v2";

const mongooseAggregatePaginate = require("mongoose-aggregate-paginate-v2");


@Schema({collection: "UserModel", timestamps: true, versionKey: false})
export class UserModel {
    @Prop({type: String, minlength: 2, maxlength: 20})
    first_name!: string;
    @Prop({type: String, minlength: 2, maxlength: 20})
    last_name!: string;
    @Prop({type: String, minlength: 11, maxlength: 11})
    phoneNumber!: string;
    @Prop({type: String, minlength: 10, maxlength: 50})
    email!: string;
    @Prop({type: String, minlength: 10, maxlength: 150})
    password!: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
UserSchema.plugin(mongooseAggregatePaginate);
UserSchema.plugin(paginate);

export type UserDocument = HydratedDocument<UserModel & SchemaTimestampsConfig>;
export const UserModelDefinition: ModelDefinition = {
    name: UserModel.name,
    schema: UserSchema,
};
