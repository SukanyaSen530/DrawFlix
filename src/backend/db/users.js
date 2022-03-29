import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

export const users = [
  {
    _id: uuid(),
    fullName: "Test",
    email: "test@gmail.com",
    password: "test@123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
