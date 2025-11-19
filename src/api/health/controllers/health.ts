export default {
  // Main health endpoint - checks all services
  async index(ctx) {
    const checks = {
      database: { status: 'unknown', responseTime: 0 },
      cloudinary: { status: 'unknown', responseTime: 0 },
    };
    let overallStatus = 'ok';
    let errorMessage: string | undefined;

    // Test database connection
    try {
      const dbStartTime = Date.now();
      await strapi.db.connection.raw('SELECT 1');
      checks.database = {
        status: 'connected',
        responseTime: Date.now() - dbStartTime,
      };
    } catch (error) {
      checks.database.status = 'disconnected';
      overallStatus = 'error';
      errorMessage = `DB: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }

    // Test Cloudinary connection with actual API call
    try {
      const cloudinaryStartTime = Date.now();
      const cloudinaryConfig = strapi.config.get('plugin::upload.provider') as {
        options?: { cloud_name?: string; api_key?: string; api_secret?: string };
      } | undefined;

      if (cloudinaryConfig?.options?.cloud_name && cloudinaryConfig?.options?.api_key) {
        // Ping Cloudinary API to verify connectivity
        const cloudinary = require('cloudinary').v2;
        cloudinary.config({
          cloud_name: cloudinaryConfig.options.cloud_name,
          api_key: cloudinaryConfig.options.api_key,
          api_secret: cloudinaryConfig.options.api_secret,
        });

        // Simple API call to verify credentials and connectivity
        await cloudinary.api.ping();
        checks.cloudinary = {
          status: 'connected',
          responseTime: Date.now() - cloudinaryStartTime,
        };
      } else {
        checks.cloudinary.status = 'not_configured';
      }
    } catch (error) {
      checks.cloudinary.status = 'disconnected';
      overallStatus = 'error';
      errorMessage = errorMessage
        ? `${errorMessage}; Cloudinary: ${error instanceof Error ? error.message : 'Unknown error'}`
        : `Cloudinary: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }

    const statusCode = overallStatus === 'ok' ? 200 : 503;

    ctx.body = {
      status: overallStatus,
      checks: {
        database: checks.database.status,
        dbResponseTime: `${checks.database.responseTime}ms`,
        cloudinary: checks.cloudinary.status,
        cloudinaryResponseTime: `${checks.cloudinary.responseTime}ms`,
      },
      ...(errorMessage && { error: errorMessage }),
      timestamp: new Date().toISOString(),
    };
    ctx.status = statusCode;
  },

  // Database-only health endpoint
  async db(ctx) {
    try {
      const startTime = Date.now();
      await strapi.db.connection.raw('SELECT 1');
      const responseTime = Date.now() - startTime;

      ctx.body = {
        status: 'ok',
        service: 'database',
        responseTime: `${responseTime}ms`,
        timestamp: new Date().toISOString(),
      };
      ctx.status = 200;
    } catch (error) {
      ctx.body = {
        status: 'error',
        service: 'database',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      };
      ctx.status = 503;
    }
  },

  // Cloudinary-only health endpoint
  async cloudinary(ctx) {
    try {
      const startTime = Date.now();
      const cloudinaryConfig = strapi.config.get('plugin::upload.provider') as {
        options?: { cloud_name?: string; api_key?: string; api_secret?: string };
      } | undefined;

      if (!cloudinaryConfig?.options?.cloud_name || !cloudinaryConfig?.options?.api_key) {
        ctx.body = {
          status: 'error',
          service: 'cloudinary',
          error: 'Cloudinary not configured',
          timestamp: new Date().toISOString(),
        };
        ctx.status = 503;
        return;
      }

      const cloudinary = require('cloudinary').v2;
      cloudinary.config({
        cloud_name: cloudinaryConfig.options.cloud_name,
        api_key: cloudinaryConfig.options.api_key,
        api_secret: cloudinaryConfig.options.api_secret,
      });

      await cloudinary.api.ping();
      const responseTime = Date.now() - startTime;

      ctx.body = {
        status: 'ok',
        service: 'cloudinary',
        responseTime: `${responseTime}ms`,
        timestamp: new Date().toISOString(),
      };
      ctx.status = 200;
    } catch (error) {
      ctx.body = {
        status: 'error',
        service: 'cloudinary',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      };
      ctx.status = 503;
    }
  },
};
