import { Polar } from "@polar-sh/sdk";


// TODO: Chagne in production(though it's not mentioned in documentation)
// Note: In documentation only 'accessToken' is mentioned but we are also adding 'server'.

export const polarClient = new Polar({
    accessToken: process.env.POLAR_ACCESS_TOKEN,
    server: process.env.NODE_ENV !== "production" ? "sandbox" : "production"
});
