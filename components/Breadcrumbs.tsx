import Link from 'next/link'

export type Crumb = {
  href: string
  label: string
}

export function Breadcrumbs({
  items,
  ariaLabel,
}: {
  items: Crumb[]
  ariaLabel: string
}) {
  return (
    <nav aria-label={ariaLabel} className="text-sm">
      <ol className="flex flex-wrap items-center gap-2 text-[rgba(11,15,20,0.62)]">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1
          return (
            <li key={`${item.href}-${idx}`} className="flex items-center gap-2">
              {isLast ? (
                <span aria-current="page" className="text-[rgba(11,15,20,0.80)]">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-text">
                  {item.label}
                </Link>
              )}
              {!isLast ? <span aria-hidden>·</span> : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
