import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

export const users = [
  {
    _id: uuid(),
    fullName: "Jane Doe",
    email: "test@gmail.com",
    password: "tesT@123",
    createdAt: "2018-01-02T23:11:16+05:30",
    updatedAt: formatDate(),
  },
];
