import { model, Schema } from "mongoose";
import { IBook } from "../interface/book.interface";
import { Borrow } from "./borrow.model";

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
      required: true,
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
    },
    description: { type: String },
    copies: {
      type: Number,
      required: true,
      min: 0,
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

bookSchema.method("setUnavailable", function () {
  this.available = false;
  return this.save();
});

bookSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate() as Partial<IBook>;

  const newCopies = update?.copies;

  if (typeof newCopies === "number" && newCopies > 0) {
    update.available = true;
    this.setUpdate(update); // ✅ Set back the modified update object
  }

  next();
});

export const Books = model("Books", bookSchema);
