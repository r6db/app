import * as React from 'react';

export default props =>
    props.glyph ? (
        <svg
            className={`icon ${props.className}`}
            viewBox={props.glyph.viewBox}
            preserveAspectRatio={props.preserveAspectRatio}
            fill={props.fill}
            stroke={props.stroke}
            width={props.width}
            height={props.height}
        >
            <use xlinkHref={props.glyph} />
        </svg>
    ) : (
        <svg className="icon" />
    );
