import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Invalid email address").max(254),
  phone: z
    .string()
    .trim()
    .min(8, "Phone number must be at least 8 digits")
    .max(20),
  service: z.string().trim().min(2, "Please select a service").max(100),
  message: z
    .string()
    .trim()
    .min(5, "Message must be at least 5 characters")
    .max(3000),
  eventTitle: z.string().optional(),
});

export const vendorSchema = z.object({
  businessName: z
    .string()
    .trim()
    .min(2, "Business name required")
    .max(120),
  contactPerson: z
    .string()
    .trim()
    .min(2, "Contact person name required")
    .max(100),
  email: z.string().trim().email("Invalid email address").max(254),
  phone: z
    .string()
    .trim()
    .min(8, "Phone number required")
    .max(20),
  category: z.string().trim().min(2, "Category required"),
  stallType: z.string().optional(),
  targetEvent: z.string().optional(),
  city: z.string().trim().default("Chennai"),
  notes: z.string().trim().max(1000).optional(),
});

export const eventSchema = z.object({
  title: z.string().trim().min(3, "Title required").max(150),
  slug: z.string().trim().min(3, "Slug required").lowercase(),
  category: z.enum([
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
  ]),
  description: z.string().trim().min(10, "Description required"),
  location: z.string().trim().min(3, "Location required"),
  startDate: z.string().or(z.date()),
  endDate: z.string().or(z.date()).optional(),
  coverImage: z.string().optional(),
  stallPrice: z.number().min(0).default(0),
  totalStalls: z.number().min(0).default(0),
  availableStalls: z.number().min(0).default(0),
  published: z.boolean().default(false),
});

export const adminLoginSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
  password: z.string().min(4, "Password required"),
});
