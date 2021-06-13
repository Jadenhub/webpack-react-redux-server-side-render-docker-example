/**
 * https://github.com/ankeetmaini/react-infinite-scroll-component/blob/master/src/utils/threshold.ts
 */


export const ThresholdUnits = {
  Percent: 'Percent',
  Pixel: 'Pixel',
};

const defaultThreshold = {
  unit: ThresholdUnits.Percent,
  value: 0.8,
};

export function parseThreshold(scrollThreshold) {
  if (typeof scrollThreshold === 'number') {
    return {
      unit: ThresholdUnits.Percent,
      value: scrollThreshold * 100,
    };
  }

  if (typeof scrollThreshold === 'string') {
    if (scrollThreshold.match(/^(\d*(\.\d+)?)px$/)) {
      return {
        unit: ThresholdUnits.Pixel,
        value: parseFloat(scrollThreshold),
      };
    }

    if (scrollThreshold.match(/^(\d*(\.\d+)?)%$/)) {
      return {
        unit: ThresholdUnits.Percent,
        value: parseFloat(scrollThreshold),
      };
    }

    console.warn(
      'scrollThreshold format is invalid. Valid formats: "120px", "50%"...'
    );

    return defaultThreshold;
  }

  console.warn('scrollThreshold should be string or number');

  return defaultThreshold;
}
