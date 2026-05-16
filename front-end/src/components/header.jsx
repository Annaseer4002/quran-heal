export function Header(){
    return (
        <header className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Heal with Quran</h1>

                <nav className="hidden md:block">
                    <ul className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
                        <li><a href="" className="hover:text-gray-900 dark:hover:text-white">Home</a></li>
                        <li><a href="" className="hover:text-gray-900 dark:hover:text-white">About</a></li>
                        <li><a href="" className="hover:text-gray-900 dark:hover:text-white">Read Quran</a></li>
                        <li><a href="" className="hover:text-gray-900 dark:hover:text-white">Listen to Quran</a></li>
                        
                    </ul>
                </nav> 

                <button className="md:hidden bg-blue-600 text-white hover:bg-blue-700 px-4 py-1 rounded-md">Menu</button>
            </div>
        </header>
    )
}