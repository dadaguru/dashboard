import DadabadiLogo from '@/app/ui/dadabadi-logo';
import LoginForm from '@/app/ui/login-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Login Page',
  description: 'Dadabari'
};
 
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-gradient-to-r from-keshar-saffronRedDark to-keshar-saffronRedLight p-3 md:h-36">
          <div className="w-80 text-white md:w-80">
            <DadabadiLogo />
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}