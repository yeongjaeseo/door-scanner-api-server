import app from '../app';
import { logger, initLogCorrelation } from '../utils/logging';
import { fetchProjectId } from '../utils/metadata';

/**
 * Initialize app and start Express server.
 */
const main = async () => {
  let project = process.env.GOOGLE_CLOUD_PROJECT || '';

  if (!project) {
    try {
      project = await fetchProjectId() || '';  // Ensure project is a string
      if (project) {
        console.log('Project ID:', project);
      } else {
        throw new Error('Project ID is empty');
      }
    } catch (error) {
      logger.warn('Could not fetch Project Id for tracing: ', error);
      project = 'default';  // Provide a fallback project ID
    }
  }

  // Initialize request-based logger with project Id
  initLogCorrelation(project);

  // Start server listening on PORT env var
  const PORT = process.env.PORT || '8080';
  app.listen(parseInt(PORT, 10), () => logger.info(`Listening on port ${PORT}`));
};

/**
 * Listen for termination signal.
 */
process.on('SIGTERM', () => {
  // Clean up resources on shutdown
  logger.info('Caught SIGTERM.');
  logger.flush();
});

main().catch(err => {
  logger.error('An error occurred during the server initialization:', err.message);
});
