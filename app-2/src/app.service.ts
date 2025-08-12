import { Injectable } from '@nestjs/common';
import { log } from 'src/infra/logger';
import { metrics, SERVICE_NAME } from './tracer';

@Injectable()
export class AppService {
  getHello(): string {
    const metric = metrics.getMeter(SERVICE_NAME)
    const successMetric = metric.createCounter('hello_success');
    successMetric.add(1)
    log.info('Cheguei aqui!')

    return 'Hello World!';
  }

  metricTest(): string {
    const metric = metrics.getMeter(SERVICE_NAME)
    const errorMetric = metric.createCounter('hello_error');
    errorMetric.add(1)
    const histogram = metric.createHistogram('request_duration')
    histogram.record(1000)

    return 'Métrica de error adicionada!';
  }
}
