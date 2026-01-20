import { FC, HTMLAttributes } from 'react';
import styles from './Container.module.css';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  centered?: boolean;
}

export const Container: FC<ContainerProps> = ({
  children,
  maxWidth = 'lg',
  centered = false,
  className = '',
  ...props
}) => {
  const classNames = [
    styles.container,
    styles[`max-${maxWidth}`],
    centered && styles.centered,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
};
