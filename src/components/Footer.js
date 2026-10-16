'use client';

import Link from 'next/link';
import { brandLinks, socialMedias } from '@/lib/brandLinks';
import { getShellCommercialLinks, getShellCopy, getShellHomeHref } from '@/lib/i18n/shellDictionary';
import { getShellMenu } from '@/lib/i18n/shellMenu';
import { findLocaleByHtmlLang } from '@/lib/i18n/locales';
import SiteName from '@/components/header/SiteName';
import { getConsentCopy, CONSENT_PRIVACY_HREF } from '@/components/consent/consentCopy';
import { openConsentPreferences } from '@/lib/consent';
import { FOCUS_RING_ON_DARK } from '@/components/ui/focusRing';

// Ícones SVG para redes sociais
const SocialIcons = {
  Youtube: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  Instagram: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  Facebook: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  TikTok: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v6.16c0 2.52-1.12 4.84-2.9 6.24-1.72 1.39-4.02 1.9-6.15 1.39-2.9-.66-5.16-3.27-5.48-6.21-.34-3.15 1.69-6.13 4.73-6.98 1.12-.31 2.31-.31 3.43.02v4.16c-.56-.38-1.21-.59-1.88-.59-1.44 0-2.63 1.15-2.68 2.59-.05 1.44 1.06 2.68 2.5 2.76 1.44.08 2.65-1.03 2.73-2.47.02-.31.02-.62.02-.93V.02z"/>
    </svg>
  ),
  Kwai: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
    </svg>
  ),
};

const socialLinks = [
  ...socialMedias.map((social) => ({
    name: social.name,
    url: social.url,
    icon: SocialIcons[social.icon] || SocialIcons.Youtube,
  })),
].filter((social) => Boolean(social.icon));

const CONTACT_EMAIL = 'contato@emcasacomcecilia.com';

const LINK_CLASS = 'transition-colors hover:text-[#ff6b35]';

function FooterColumn({ title, className = '', children }) {
  return (
    <div className={className}>
      <p className="mb-3 text-[0.8rem] font-extrabold text-white">{title}</p>
      <ul className="flex flex-col gap-2.5 text-sm font-medium text-white/78">{children}</ul>
    </div>
  );
}

export default function Footer({ lang = 'pt-BR' }) {
  const currentYear = new Date().getFullYear();

  const localeKey = findLocaleByHtmlLang(lang) || 'pt';

  const isPt = localeKey === 'pt';
  const copy = getShellCopy(localeKey);
  const menu = getShellMenu(localeKey);
  const commercialLinks = getShellCommercialLinks(localeKey);
  const homeHref = getShellHomeHref(localeKey);
  const consentCopy = getConsentCopy(localeKey);

  const exploreLinks = [
    ...menu.primary,
    ...menu.more.filter((item) => item.id === 'videos'),
    ...commercialLinks,
  ];
  const houseLinks = menu.more.filter((item) => item.id !== 'videos');

  return (
    <footer className="bg-[#0f1d3a] px-6 pb-10 pt-12 print:hidden">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 border-b border-white/10 pb-8 lg:flex-row lg:justify-between lg:gap-16">
          <div className="flex flex-col items-center gap-5 text-center lg:items-start lg:text-left">
            <Link href={homeHref} className="group flex flex-col items-center lg:items-start">
              <SiteName style={{ fontSize: '1.62rem' }} />
              <span className="mt-1 text-[0.65rem] font-medium tracking-[0.3px] text-white/70">{copy.tagline}</span>
            </Link>

            <div className="flex items-center justify-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/12 text-[#ff6b35] transition-colors hover:border-[#ff6b35]/50 hover:bg-white/5 motion-safe:transition-all motion-safe:hover:-translate-y-0.5"
                  aria-label={copy.followAria.replace('{social}', social.name)}
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>

          <div className={`grid gap-x-10 gap-y-8 lg:flex lg:gap-x-16 ${isPt ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'}`}>
            <FooterColumn title={copy.footerExploreLabel}>
              {exploreLinks.map((link) => (
                <li key={link.id}>
                  <Link href={link.href} className={LINK_CLASS}>{link.label}</Link>
                </li>
              ))}
            </FooterColumn>

            {isPt ? (
              <>
                <FooterColumn title={menu.footerLabels.house}>
                  {houseLinks.map((link) => (
                    <li key={link.id}>
                      <Link href={link.href} className={LINK_CLASS}>{link.label}</Link>
                    </li>
                  ))}
                  <li>
                    <a href={brandLinks.mediaKit} target="_blank" rel="noopener noreferrer" className={`font-bold text-white ${LINK_CLASS}`}>
                      {menu.mediaKitLabel}
                    </a>
                  </li>
                </FooterColumn>

                <FooterColumn title={menu.footerLabels.partners} className="col-span-2 lg:col-span-1">
                  <li>
                    <a href={brandLinks.dicas} target="_blank" rel="noopener noreferrer" className="font-bold text-[#ff6b35] transition-colors hover:text-white">
                      {menu.dicasLabels.long}
                    </a>
                  </li>
                  <li>
                    <a href={brandLinks.damie} target="_blank" rel="noopener noreferrer" className="font-bold text-[#ffd700] transition-colors hover:text-white">
                      {copy.damieLabel}
                    </a>
                  </li>
                </FooterColumn>
              </>
            ) : (
              <FooterColumn title={copy.contactLabel}>
                <li>
                  <a href={`mailto:${CONTACT_EMAIL}`} className={LINK_CLASS}>{CONTACT_EMAIL}</a>
                </li>
              </FooterColumn>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 pt-5 text-center text-sm text-white/60 lg:flex-row lg:items-center lg:justify-between lg:text-left">
          <p>© {currentYear} Em Casa com Cecília. {copy.footerRights}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 lg:justify-start">
            <Link href={CONSENT_PRIVACY_HREF} className={LINK_CLASS}>
              {isPt ? copy.privacyLabel : consentCopy.privacyLabel}
            </Link>
            <button
              type="button"
              onClick={openConsentPreferences}
              className={`cursor-pointer transition-colors hover:text-[#ff6b35] ${FOCUS_RING_ON_DARK}`}
            >
              {consentCopy.preferences}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
