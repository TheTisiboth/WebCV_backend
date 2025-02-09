/**
 * cv service
 */
import {Strapi} from "@strapi/types/dist/core";

export default ({strapi}: { strapi: Strapi }) => ({
    fetchCVS: async () => {
        return 'service okkay'
    }
})

