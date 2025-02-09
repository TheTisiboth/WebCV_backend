/**
 * A set of functions called "actions" for `cv`
 */
import { Context } from 'koa';
import {Strapi} from "@strapi/types/dist/core";

export default ({strapi}: {strapi: Strapi}) => ({
    handleFetchCVS: async (ctx: Context) => {
        try {
            const response = await strapi.service('api::cv.cv').fetchCVS();
            ctx.body = {testt: 'okidoki', response}
        } catch (err) {
            ctx.body = err;
            ctx.status = 500;
        }
    }
});

