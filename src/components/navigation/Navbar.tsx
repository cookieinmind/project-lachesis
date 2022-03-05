import React, { useState } from 'react';
import Link from 'next/link';
import { MainRoutes } from '@/models/Routers';
import { useRouter } from 'next/router';

export default function Navbar() {
  return (
    <div className="bg-surface border-t-[3px] flex justify-between py-3 px-24 ">
      <NavItem icon="home" url={MainRoutes.home} />
      <NavItem icon="create" url={MainRoutes.dashboard} />
      <NavItem icon="dashboard" url={MainRoutes.library} />
    </div>
  );
}

function NavItem({ icon, url }: { icon: string; url: string }) {
  const router = useRouter();

  const isActive = router.pathname === url;

  const dotVisible = isActive ? 'visible opacity-100' : 'invisible opacity-0';
  const iconVisible = isActive ? 'opacity-100' : 'opacity-50';

  return (
    <Link href={url}>
      <a className={`flex flex-col gap-2 items-center ${iconVisible}`}>
        <span className="material-icons">{icon}</span>
        <span
          className={`w-2 h-2 bg-orange rotate-45 transition-all ${dotVisible}`}
        ></span>
      </a>
    </Link>
  );
}
