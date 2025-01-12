import mongoose, { Schema, model, models } from "mongoose";

const TemplateSchema = new Schema(
  {
    title: { type: String },
    template_id: { type: String },
    styles: { type: Array },
  },
  { timestamps: true }
);

const Template = models.Template || model("Template", TemplateSchema);

// console.log("Registered Models:", mongoose.models);
export default Template;
 