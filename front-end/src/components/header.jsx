import { Link } from "react-router-dom"
import { useState } from "react"

export function Header(){
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    return (
        <>
        <header className="fixed inset-x-0 top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-8">
                <Link to="/" className="no-underline">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white hover:opacity-80 transition">Heal with Quran</h1>
                </Link>

                <nav className="hidden md:block">
                    <ul className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
                        <li><Link to="/" className="hover:text-gray-900 dark:hover:text-white transition no-underline">Home</Link></li>
                        <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition">About</a></li>
                        <li><Link to="/read" className="hover:text-gray-900 dark:hover:text-white transition no-underline">Read Quran</Link></li>
                        <li><Link to="/listen" className="hover:text-gray-900 dark:hover:text-white transition no-underline">Listen to Quran</Link></li>
                        
                    </ul>
                </nav> 

                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden bg-blue-600 text-white hover:bg-blue-700 px-4 py-1 rounded-md">Menu</button>
            </div>
        </header>
        {isMenuOpen && (
            <nav className="fixed inset-x-0 top-16 z-40 md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg">
                <ul className="flex flex-col p-4 gap-3 text-gray-600 dark:text-gray-300">
                    <li><Link to="/" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-900 dark:hover:text-white transition no-underline block py-2">Home</Link></li>
                    <li><a href="#" className="hover:text-gray-900 dark:hover:text-white transition block py-2">About</a></li>
                    <li><Link to="/read" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-900 dark:hover:text-white transition no-underline block py-2">Read Quran</Link></li>
                    <li><Link to="/listen" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-900 dark:hover:text-white transition no-underline block py-2">Listen to Quran</Link></li>
                </ul>
            </nav>
        )}
        <div className="h-16" aria-hidden="true" />
        </>
    )
}