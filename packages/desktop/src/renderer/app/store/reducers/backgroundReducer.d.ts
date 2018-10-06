import { BackgroundActions } from '../actions/background';
export default function backgroundReducer(
    state:
        | {
              animate: boolean;
              image: {
                  background: string;
                  viewBox: string;
                  polys: {
                      fill: string;
                      fillOpacity: number;
                      d: string;
                  }[];
              };
              filter: string;
              spring: {
                  tension: number;
                  friction: number;
              };
          }
        | undefined,
    action: BackgroundActions,
): {
    animate: boolean;
    image: {
        background: string;
        viewBox: string;
        polys: {
            fill: string;
            fillOpacity: number;
            d: string;
        }[];
    };
    filter: string;
    spring: {
        tension: number;
        friction: number;
    };
};
