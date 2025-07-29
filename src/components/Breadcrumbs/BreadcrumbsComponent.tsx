'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface IBreadcrumbItem {
  label: string;
  href: string;
}

const BreadcrumbsComponent: React.FC = () => {
  const pathname = usePathname();

  // Определяем элементы хлебных крошек на основе текущего пути
  const getBreadcrumbs = (): IBreadcrumbItem[] => {
    const crumbs: IBreadcrumbItem[] = [{ label: 'Home', href: '/' }];
    if (pathname.includes('/profile')) {
      crumbs.push({ label: 'Profile', href: '/profile' });
    }
    if (pathname.includes('/profile/edit')) {
      crumbs.push({ label: 'Edit profile', href: '/profile/edit' });
    }
    return crumbs;
  };

  const breadcrumbs = getBreadcrumbs();
  return (
    <nav className="flex items-center gap-x-2">
      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={crumb.href}>
          {index > 0 && <ChevronRight className="w-4 h-4" />}
          {index === breadcrumbs.length - 1 ? (
            <span className="font-medium underline">{crumb.label}</span>
          ) : (
            <Link
              href={crumb.href}
              className="hover:underline hover:text-amber-500 transition-colors "
            >
              {crumb.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
export default BreadcrumbsComponent;
