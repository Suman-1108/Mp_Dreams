import { Schema, models, model } from "mongoose";

const EventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    category: {
      type: String,
      enum: [
        "apartment",
        "wedding",
        "corporate",
        "food-fest",
        "automobile",
        "kids-carnival",
        "festive-mela",
        "handloom-crafts",
        "sports-fitness",
        "cultural-traditional",
        "fashion-lifestyle",
        "book-education",
        "community",
        "expo",
        "family",
      ],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: Date,
    coverImage: String,
    stallPrice: {
      type: Number,
      min: 0,
      default: 0,
    },
    totalStalls: {
      type: Number,
      min: 0,
      default: 0,
    },
    availableStalls: {
      type: Number,
      min: 0,
      default: 0,
    },
    published: {
      type: Boolean,
      default: false,
    },
    features: [String],
  },
  { timestamps: true }
);

const Event = models.Event || model("Event", EventSchema);

export default Event;
