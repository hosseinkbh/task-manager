import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { UserModel } from './user.model';


@Schema({ collection: 'TagModel', timestamps: true, versionKey: false })
export class TagModel {
  @Prop({ type: String, minlength: 1, maxlength: 100, required: true })
  title!: string;
  @Prop({ type: String, minlength: 0, maxlength: 5000 , required : false , default : false })
  description?: string | undefined;
  @Prop({ type: String, ref: 'UserModel', required: true })
  createdBy!: Types.ObjectId | UserModel;
  @Prop({ type: String ,minlength :7 ,maxlength:7, required:false })
  color : string | undefined;
}
export const TagSchema = SchemaFactory.createForClass(TagModel);
export type TagDocument = HydratedDocument<TagModel>;
TagSchema.plugin(paginate);
export const TagModelDefinition: ModelDefinition = {
  name: TagModel.name,
  schema: TagSchema,
};
