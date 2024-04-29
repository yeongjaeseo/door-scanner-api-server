import pino from 'pino';
import pinohttp from 'pino-http';

let project: string | undefined;
export const initLogCorrelation = (projectId: string) => {
  project = projectId;
};

const formatters = {
  level(label: string) {
  return { severity: label };
  },
};

export const logger = pino({
  formatters,
  messageKey: 'message',
});

export const pinoHttp = pinohttp({
  logger: logger,
  customProps: (req) => {
    const traceHeader = req.headers['x-cloud-trace-context'];
    const traceId = Array.isArray(traceHeader) ? traceHeader[0] : traceHeader;
    const [traceIdPart] = (traceId ?? '').split('/');
    const trace = traceIdPart 
      ? { 'logging.googleapis.com/trace': `projects/${project}/traces/${traceIdPart}` }
      : {};
    return trace;
  },
});
