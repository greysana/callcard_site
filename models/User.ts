import mongoose, { Schema, model, models } from "mongoose";

// Templates Model Reference (Assuming you have defined this model elsewhere)
const UserSchema = new Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String, required: true },
    password: { type: String },
    photo: { type: String },
    register_type: { type: String },

    // Reference to the Templates model
    templates: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Template", default: null },
    ],
    businessDetails: [
      {
        full_name: { type: String },
        first_name: { type: String },
        last_name: { type: String },
        personal_email: { type: String },
        bio: { type: String },
        company_email: { type: String },
        zip_code: { type: String },
        company_name: { type: String },
        position: { type: String },
        address: { type: String },
        mobilePhone: { type: String },
        telephone: { type: String },
        logo: { type: String },
        company_address: { type: String },
        web_url: { type: String },
        qr_url: { type: String },
        color_palette: { type: [String], default: [] },
        template: { type: mongoose.Schema.Types.Mixed },
      },
    ],
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);

// console.log("Registered Models:", mongoose.models);
export default User;
