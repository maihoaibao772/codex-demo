import { ComponentPropsWithoutRef, ElementType } from 'react';

type ButtonProps<T extends ElementType> = {
  as?: T;
  variant?: 'primary' | 'ghost';
  size?: 'sm' | 'md';
  className?: string;
} & ComponentPropsWithoutRef<T>;

const Button = <T extends ElementType = 'button'>(props: ButtonProps<T>) => {
  const { as, variant = 'primary', size = 'md', className = '', children, ...rest } = props;
  const Component = as || 'button';

  const variantClass =
    variant === 'primary'
      ? 'bg-primary text-white hover:brightness-110'
      : 'bg-white text-primary border border-primary/30 hover:bg-primary/5';
  const sizeClass = size === 'sm' ? 'px-3 py-2 text-sm' : 'px-4 py-3 text-sm md:text-base';

  return (
    <Component
      className={`inline-flex items-center justify-center rounded-xl font-semibold shadow-soft transition ${variantClass} ${sizeClass} ${className}`}
      {...(rest as ComponentPropsWithoutRef<ElementType>)}
    >
      {children}
    </Component>
  );
};

export default Button;
