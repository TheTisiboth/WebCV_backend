/**
 * A set of functions called "actions" for `cv`
 */

export default ({strapi}) => ({
    async handleFetchCVS(ctx) {
        try {
            const response = await strapi.service('api::cv.cv').fetchCVS();
            ctx.body = {testt: 'ok', response}
        } catch (err) {
            ctx.body = err;
            ctx.status = 500;
        }
    }
});

