import * as React from 'react';
import './button.scss';
interface IButtonProps
    extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    label: string | JSX.Element;
    icon?: any;
    role?: 'primary' | 'accent' | 'error' | 'warning' | 'success' | 'info';
    size?: 'small' | 'large';
    outline?: boolean;
    active?: boolean;
}
declare class Button extends React.PureComponent<IButtonProps, {}> {
    render(): JSX.Element;
}
declare const _default: typeof Button;
export default _default;
