import * as React from 'react';
import { hot } from 'react-hot-loader';
import { IPolyImage } from 'renderer/interfaces';
import { clash } from 'renderer/assets/images';
import { Spring, animated } from 'react-spring';
import './page.scss';

interface IPageComponentProps {
    name: string;
    backgroundFilter?: string;
    background?: IPolyImage;
}

class Page extends React.PureComponent<IPageComponentProps> {
    static defaultFilter = 'blur(30px)';
    static defaultImage = clash;
    render() {
        const bg = this.props.background || Page.defaultImage;
        return (
            <div className={`page ${this.props.name}`}>
                <svg
                    className="page__background"
                    viewBox={bg.viewBox}
                    preserveAspectRatio="xMinYMin slice"
                    style={{
                        background: bg.background,
                        filter:
                            this.props.backgroundFilter !== undefined
                                ? this.props.backgroundFilter
                                : Page.defaultFilter,
                    }}
                >
                    {bg.polys.map((path, i) => (
                        <Spring key={i} native to={path} config={{ tension: 100, friction: 120 }}>
                            {(styles: any) => (
                                <animated.path
                                    key={i}
                                    d={styles.d}
                                    fill={styles.fill}
                                    fillOpacity={styles.fillOpacity}
                                />
                            )}
                        </Spring>
                    ))}
                </svg>
                <div className="page__content">{this.props.children}</div>
            </div>
        );
    }
}

export default hot(module)(Page);
