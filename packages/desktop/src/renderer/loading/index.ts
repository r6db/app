/**
 * placeholder
 * maybe a floating loading page? dunno. this is just for testing seperate 'windows' right now
 */
import './loading.scss';

const el = document.querySelector('.loading__text');
const svg = document.querySelector('.loading__logo');

if (svg) {
    (svg as SVGElement).style.animation = 'loading-finish 2s ease-in-out forwards';
    (svg as SVGElement).style.opacity = '1';
    Array.from(svg.querySelectorAll('path')).forEach((path: SVGPathElement) => {
        const l = path.getTotalLength();
        path.style.strokeDashoffset = l + 'px';
        path.style.strokeDasharray = l / 15 + 'px';
    });
}
