import { IoSearch } from 'react-icons/io5';
import { LuUserCircle2 } from 'react-icons/lu';

export default function Header(): JSX.Element {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <span>CryptoTrackr</span>
        </div>
        <form className="header-search">
          <input name="search" type="text" placeholder="Search" />
          <button>
            <IoSearch />
          </button>
        </form>
        <div className="header-user">
          <LuUserCircle2 />
          <div className="header-user-menu">
            <div></div>
          </div>
        </div>
      </div>
    </header>
  );
}
