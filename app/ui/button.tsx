import clsx from 'clsx';
import { useFormState, useFormStatus } from 'react-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  const {pending} = useFormStatus();
  return (
    <button aria-disabled={pending}
      {...rest}
      className={clsx(
        'flex h-10 items-center rounded-lg bg-amber-500 px-4 text-sm font-medium text-keshar-saffronRedDark transition-colors hover:bg-keshar-saffronRedDark hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-keshar-saffronRedLight aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
        className,
      )}
    >
      {children}
    </button>
  );
}
