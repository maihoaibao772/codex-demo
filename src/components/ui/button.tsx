import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { ButtonHTMLAttributes, forwardRef } from 'react';

const buttonVariants = cva(
  'group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/15 px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
  {
    variants: {
      tone: {
        primary: 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-glow hover:brightness-110',
        ghost: 'bg-white/10 hover:bg-white/15',
      },
      size: {
        default: 'px-6 py-2',
        sm: 'px-4 py-1.5 text-[0.65rem] tracking-[0.35em]',
      },
    },
    defaultVariants: {
      tone: 'primary',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, tone, size, children, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ tone, size }), className)} {...props}>
      <span className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="relative z-10">{children}</span>
    </button>
  ),
);

Button.displayName = 'Button';
