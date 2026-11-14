import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import UserList from './UserList.jsx'

export default function App() {
  const [listOfUsers, setListOfUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')

  useEffect(() => {
    let active = true
    async function fetchUsers() {
      setIsLoading(true)
      setError('')
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users')
        if (active) setListOfUsers(response.data)
      } catch {
        if (active) setError('Impossible de récupérer les contacts. Vérifiez votre connexion puis réessayez.')
      } finally {
        if (active) setIsLoading(false)
      }
    }
    fetchUsers()
    return () => { active = false }
  }, [])

  const filteredUsers = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('fr')
    return listOfUsers.filter((user) => user.name.toLocaleLowerCase('fr').includes(normalizedQuery))
  }, [listOfUsers, query])

  return (
    <main className="mx-auto max-w-5xl px-5 text-[#252821] sm:px-10">
      <header className="flex h-[76px] items-center justify-between border-b border-[#e7e8df]">
        <a className="flex items-center gap-2.5 text-base font-bold tracking-tight no-underline" href="#accueil" aria-label="Le carnet, accueil">
          <span className="grid size-[30px] place-items-center rounded-[10px] bg-[#dfedcf] font-display text-xl text-[#42633e]">c.</span>le carnet
        </a>
        <span className="flex items-center gap-2 text-xs text-[#73776e]"><span className="size-2 rounded-full bg-[#83ad69] ring-4 ring-[#e6eedf]" />Répertoire public</span>
      </header>

      <section className="relative flex min-h-[300px] items-center justify-between overflow-hidden border-b border-[#e7e8df] px-2 py-10 sm:px-8">
        <div className="max-w-[490px]">
          <p className="mb-4 text-[10px] font-bold tracking-[1.7px] text-[#85897e]">LES GENS, TOUT SIMPLEMENT <span className="text-[#dd835f]">✳</span></p>
          <h1 className="m-0 font-display text-[54px] leading-[.99] tracking-[-2px] sm:text-[65px]">Un carnet<br />bien <em className="text-[#748d5e]">rempli.</em></h1>
          <p className="mt-5 max-w-[370px] text-sm leading-7 text-[#797c72]">Faites connaissance avec les personnes du réseau. Un nom vous dit quelque chose ? Cherchez-le.</p>
        </div>
        <div className="relative mr-4 hidden h-[210px] w-[210px] shrink-0 sm:block" aria-hidden="true">
          <div className="absolute left-6 top-6 size-40 rounded-full bg-[#e8efdc]" />
          <div className="absolute left-[105px] top-8 flex h-32 w-24 rotate-12 justify-center rounded-xl border border-[#e7e6dd] bg-[#fffdf8] pt-4 text-2xl text-[#db926f] shadow-xl">✳</div>
          <div className="absolute left-10 top-12 h-[155px] w-[126px] -rotate-[7deg] rounded-xl border border-[#e7e6dd] bg-[#fffdf8] p-4 shadow-xl">
            <span className="mb-3 grid size-11 place-items-center rounded-full bg-[#f0d5c3] text-2xl text-[#8e5e49]">☺</span>
            <i className="mb-2 block h-1 w-5/6 rounded bg-[#e8e9df]" /><i className="mb-2 block h-1 w-3/4 rounded bg-[#e8e9df]" /><i className="block h-1 w-1/2 rounded bg-[#e8e9df]" />
          </div>
          <span className="absolute left-2 top-6 text-xl text-[#db926f]">✳</span><span className="absolute bottom-8 right-0 text-xl text-[#a3b781]">✦</span>
        </div>
      </section>

      <section className="py-10" aria-labelledby="directory-title">
        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div><p className="mb-2 text-[10px] font-bold tracking-[1.7px] text-[#85897e]">VOTRE PETIT MONDE</p><h2 id="directory-title" className="m-0 font-display text-3xl">Les contacts <span className="font-sans text-xs text-[#999c92]">({listOfUsers.length.toString().padStart(2, '0')})</span></h2></div>
          <label className="flex h-[42px] w-full items-center gap-2.5 rounded-lg border border-[#e3e4db] bg-[#fffefa] px-3 text-[#898d82] sm:w-[270px]">
            <span className="text-xl" aria-hidden="true">⌕</span>
            <input className="min-w-0 flex-1 border-0 bg-transparent text-xs text-[#252821] outline-none placeholder:text-[#9a9c94]" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher un nom…" aria-label="Rechercher un utilisateur par nom" />
            {query && <button type="button" className="border-0 bg-transparent text-xl text-[#8e9187]" onClick={() => setQuery('')} aria-label="Effacer la recherche">×</button>}
          </label>
        </div>
        {isLoading ? (
          <div className="flex min-h-[105px] items-center gap-4 rounded-xl border border-[#e7e8df] bg-[#fffefa] p-6" role="status"><span className="size-7 animate-[spin_.8s_linear_infinite] rounded-full border-2 border-[#e6ebdf] border-t-[#748d5e]" /><div><strong className="font-display text-lg">On ouvre le carnet…</strong><p className="mt-1 text-xs text-[#83867c]">Chargement des utilisateurs</p></div></div>
        ) : error ? (
          <div className="flex min-h-[105px] items-start gap-4 rounded-xl border border-[#e7e8df] bg-[#fffefa] p-6" role="alert"><span className="grid size-[30px] shrink-0 place-items-center rounded-full bg-[#f7e4de] font-bold text-[#b65d45]">!</span><div><strong className="font-display text-lg">Le carnet est inaccessible</strong><p className="mt-1 text-xs text-[#83867c]">{error}</p><button className="mt-3 border-0 bg-transparent p-0 text-xs font-bold text-[#637e50]" onClick={() => window.location.reload()}>Réessayer ↗</button></div></div>
        ) : filteredUsers.length ? <UserList users={filteredUsers} /> : (
          <div className="flex flex-col items-center rounded-xl border border-dashed border-[#dedfd5] px-5 py-11 text-[#64685e]"><span className="mb-2 text-2xl">⌕</span><strong className="font-display text-lg">Aucun nom ne correspond</strong><p className="mt-1 text-xs text-[#83867c]">Essayez avec un autre prénom ou nom.</p></div>
        )}
      </section>
      <footer className="flex justify-between gap-3 border-t border-[#e7e8df] py-5 text-[10px] text-[#898c83]"><span>Fait pour les belles rencontres.</span><span className="text-[8px] font-bold tracking-[1.2px]">UNE LISTE, DES HISTOIRES <b className="text-[#dc8c68]">✳</b></span></footer>
    </main>
  )
}
