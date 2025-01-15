import { atom } from "nanostores";
import { generatePassword } from "../password";

export const $password = atom<string>(generatePassword());