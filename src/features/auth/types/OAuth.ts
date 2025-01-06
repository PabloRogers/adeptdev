import { z } from "zod";

const OAuthProvidersSchema = z.enum(["google", "github"]);

export default OAuthProvidersSchema;
