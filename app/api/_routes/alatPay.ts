import { Elysia } from 'elysia'
import logger from '@/utils/logger'
import { alatPayService } from '@/app/api/_services/alatPayService'

export const alatPayRoutes = new Elysia()
  .get('/payments/alatpay/health', async ({ set }) => {
    try {
      logger.debug('AlertPay health check initiated')
      const status = alatPayService.getConfigStatus()
      if (status.isConfigured) {
        set.status = 200
        return {
          success: true,
          message: 'AlertPay service is healthy',
          timestamp: new Date().toISOString()
        }
      } else {
        set.status = 503
        return {
          success: false,
          message: 'AlertPay service is not properly configured',
          timestamp: new Date().toISOString()
        }
      }
    } catch (error: any) {
      logger.error('AlertPay health check failed', {
        message: error.message,
        stack: error.stack
      })
      set.status = 503
      return {
        success: false,
        message: 'AlertPay service is not available',
        timestamp: new Date().toISOString()
      }
    }
  })
  .get('/payments/alatpay/status', async ({ set }) => {
    try {
      logger.info('Checking AlertPay service status')
      const status = await alatPayService.getConfigStatus()
      logger.info('AlertPay service status retrieved', {
        isConfigured: status.isConfigured,
        baseUrl: status.baseUrl,
        hasSubscriptionKey: status.hasSubscriptionKey
      })
      set.status = 200
      return {
        success: true,
        message: 'AlertPay service status retrieved successfully',
        data: status,
        timestamp: new Date().toISOString()
      }
    } catch (error: any) {
      logger.error('Error retrieving AlertPay service status', {
        message: error.message,
        stack: error.stack
      })
      set.status = 500
      return {
        success: false,
        message: 'Failed to retrieve service status',
        timestamp: new Date().toISOString()
      }
    }
  })
