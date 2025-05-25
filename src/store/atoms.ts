import { atomWithStorage } from "jotai/utils";
import { CurrentUser } from "../types/types";

export const currentUser = atomWithStorage<CurrentUser | null>("rrid", null);
