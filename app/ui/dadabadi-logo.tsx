import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { eczar } from '@/app/ui/fonts';
import { mukta } from '@/app/ui/fonts';


export default function DadabadiLogo() {
  return (
    <div
      className={`${eczar.className} flex flex-row items-center leading-none text-amber-400`}
    >
      <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[44px]">दादाबाड़ी</p>
    </div>
  );
}
