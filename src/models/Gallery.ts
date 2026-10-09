import { Schema, models, model } from "mongoose";

const GallerySchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["wedding", "corporate", "expo", "apartment", "accounting", "general"],
      default: "general",
    },
    imageUrl: { type: String, required: true },
    description: String,
    eventTitle: String,
    featured: { type: Boolean, default: false },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Gallery = models.Gallery || model("Gallery", GallerySchema);

export default Gallery;
