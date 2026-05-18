import { FaEnvelope, FaXTwitter, FaGithub } from 'react-icons/fa6';

export function ContactInfo() {
  const contacts = [
    {
      href: 'mailto:hello@vib3scape.dev',
      label: 'hello@vib3scape.dev',
      icon: <FaEnvelope className="w-4 h-4 text-[var(--color-accent)]" aria-hidden="true" />,
      title: 'Email Address',
    },
    {
      href: 'https://x.com/vib3scape',
      label: '@vib3scape',
      icon: <FaXTwitter className="w-4 h-4 text-[var(--color-accent)]" aria-hidden="true" />,
      title: 'Twitter / X Profile',
    },
    {
      href: 'https://github.com/vib3scape',
      label: 'github.com/vib3scape',
      icon: <FaGithub className="w-4 h-4 text-[var(--color-accent)]" aria-hidden="true" />,
      title: 'GitHub Organization',
    },
  ];

  return (
    <div className="flex flex-col text-sm text-[var(--color-fg)]">
      <p className="mb-5 leading-relaxed">
        Have something to say? Reach out. Whether you want to discuss a post, suggest a topic, or just say hello, I'd love to hear from you.
      </p>
      
      <ul className="flex flex-col gap-1">
        {contacts.map((contact) => (
          <li key={contact.href}>
            <a
              href={contact.href}
              target={contact.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={contact.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              title={contact.title}
              className={[
                'w-full min-h-[44px] flex items-center gap-3.5 py-2.5 px-1 rounded-[var(--border-radius)]',
                'hover:text-[var(--color-accent)] transition-colors duration-200 focus:outline-none',
                'focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-[-2px]',
              ].join(' ')}
            >
              <span className="shrink-0 w-8 h-8 rounded-full bg-[var(--color-border)]/40 flex items-center justify-center">
                {contact.icon}
              </span>
              <span className="truncate font-medium">{contact.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
