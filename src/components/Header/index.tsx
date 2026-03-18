import { Menu } from 'lucide-react'
import logo from '../../assets/logo.png'

const Header = () => {
  return (
    <header className="flex items-center justify-between rounded-t-[4px] border bg-white/70 px-[20px] py-[15px] backdrop-blur supports-[backdrop-filter]:bg-white/50">
      <a href="/" className="group flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-slate-900 to-slate-700 shadow-sm ring-1 ring-black/5">
          <img
            src={logo}
            alt="Burma Sailing"
            className="h-9 w-9 rounded-full object-cover ring-2 ring-white/90"
          />
        </span>
        <span className="leading-tight">
          <span className="block text-[15px] font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-slate-800">
            Burma Sailing
          </span>
          <span className="block text-[12px] font-medium text-slate-500">Sailing & Adventures</span>
        </span>
      </a>

      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-md "
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>
    </header>
  )
}

export default Header