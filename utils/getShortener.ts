
import { customAlphabet } from "nanoid";

const getShortenedId = (): string => {
    const nanoid = customAlphabet("6789BCDFGHJKLMNPQRTWbcdfghjkmnpqrtwz", 10);
    return nanoid();
};

export default getShortenedId;