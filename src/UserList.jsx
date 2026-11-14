import { useState } from 'react'

const accents = [
  'bg-[#f7e1d5] text-[#a96143]', 'bg-[#dce7f0] text-[#506f89]',
  'bg-[#e2ebd7] text-[#56734a]', 'bg-[#e9e1f1] text-[#79628f]',
  'bg-[#f2ebd2] text-[#947b3f]', 'bg-[#f2dfe3] text-[#9c5d6b]',
]

function initials(name) {
  return name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase()
}

export default function UserList({ users }) {
  const [selectedId, setSelectedId] = useState(null)

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {users.map((user, index) => {
        const expanded = selectedId === user.id
        return (
          <article className={`overflow-hidden rounded-xl border bg-[#fffefa] transition ${expanded ? 'border-[#c8d3bd] shadow-md' : 'border-[#e7e8df] hover:border-[#c8d3bd] hover:shadow-md'}`} key={user.id}>
            <button className="grid min-h-[98px] w-full grid-cols-[47px_1fr_20px] grid-rows-[36px_20px] items-center px-4 py-3 text-left" aria-expanded={expanded} onClick={() => setSelectedId(expanded ? null : user.id)}>
              <span className={`relative row-span-2 grid size-10 place-items-center rounded-[13px] text-xs font-bold tracking-wide ${accents[index % accents.length]}`}>{initials(user.name)}<i className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-[#fffefa] bg-[#85ae72]" /></span>
              <span className="flex min-w-0 flex-col gap-1"><span className="truncate text-[13px] font-bold">{user.name}</span><span className="truncate text-[11px] text-[#85897e]">{user.company.name}</span></span>
              <span className={`justify-self-end self-start text-[15px] text-[#9da195] transition ${expanded ? 'rotate-90 text-[#748d5e]' : ''}`} aria-hidden="true">↗</span>
              <span className="col-span-2 col-start-2 self-end text-[11px] text-[#7d8177]">{user.email}</span>
            </button>
            {expanded && (
              <div className="grid grid-cols-2 gap-3 border-t border-[#edede6] bg-[#fbfbf5] px-4 py-3.5 sm:grid-cols-[1.35fr_.85fr_1fr]">
                <div className="col-span-2 flex min-w-0 flex-col gap-1.5 text-[10px] leading-relaxed text-[#55594f] sm:col-span-1"><span className="text-[8px] font-bold tracking-[1px] text-[#a0a397]">ADRESSE</span><span>{user.address.suite}, {user.address.street}<br />{user.address.city} {user.address.zipcode}</span></div>
                <div className="flex min-w-0 flex-col gap-1.5 text-[10px] text-[#55594f]"><span className="text-[8px] font-bold tracking-[1px] text-[#a0a397]">TÉLÉPHONE</span><a className="break-words text-[#617a50] no-underline hover:underline" href={`tel:${user.phone}`}>{user.phone}</a></div>
                <div className="flex min-w-0 flex-col gap-1.5 text-[10px] text-[#55594f]"><span className="text-[8px] font-bold tracking-[1px] text-[#a0a397]">SITE WEB</span><a className="break-all text-[#617a50] no-underline hover:underline" href={`https://${user.website}`} target="_blank" rel="noreferrer">{user.website} ↗</a></div>
              </div>
            )}
          </article>
        )
      })}
    </div>
  )
}
