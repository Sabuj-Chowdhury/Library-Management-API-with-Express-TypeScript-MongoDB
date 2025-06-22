import { model, Schema } from "mongoose";
import { IBorrow } from "../interface/borrow.interface";
import { Books } from "./book.model";

const borrowSchema = new Schema<IBorrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Books",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

borrowSchema.post("save", async function (doc, next) {
  try {
    const borrowedBook = (await Books.findById(doc.book)) as any;

    borrowedBook.copies -= doc.quantity;

    await borrowedBook.save();
    if (borrowedBook.copies == 0) {
      borrowedBook.setUnavailable();
    }
  } catch (error) {
    console.log(error);
  }
  next();
});

export const Borrow = model("Borrow", borrowSchema);
