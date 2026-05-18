import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import quranCover from "../assets/Read.png"

export function ReadQuran() {
	const [chapters, setChapters] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState("")

	useEffect(() => {
		const controller = new AbortController()

		async function loadChapters() {
			try {
				setLoading(true)
				setError("")

				const response = await fetch("/api/chapters", {
					signal: controller.signal,
				})

				if (!response.ok) {
					throw new Error("Failed to fetch chapters")
				}

				const data = await response.json()
				const chapterList = Array.isArray(data)
					? data
					: Array.isArray(data?.chapters)
						? data.chapters
						: []

				setChapters(chapterList)
			} catch (fetchError) {
				if (fetchError.name !== "AbortError") {
					setError(fetchError.message || "Something went wrong")
				}
			} finally {
				setLoading(false)
			}
		}

		loadChapters()

		return () => controller.abort()
	}, [])

	if (loading) {
		return <p className="text-center text-sm text-gray-500">Loading chapters...</p>
	}

	if (error) {
		return <p className="text-center text-sm text-red-600">{error}</p>
	}

	return (
		<section className="px-2 py-6 sm:px-4 sm:py-8">
			<div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
				{chapters.map((chapter) => (
					<Link
						key={chapter.id}
						to={`/chapter/${chapter.id}`}
						className="no-underline"
					>
						<article className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white p-2 sm:p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
						>
						<div
							className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 transition group-hover:opacity-15"
							style={{ backgroundImage: `url(${quranCover})` }}
						/>
						<div className="absolute inset-0 bg-white/70" />

						<div className="relative z-10 flex flex-col items-center text-center">
						<p className="text-[10px] sm:text-xs font-medium uppercase tracking-wide text-gray-500">
							Surah {chapter.id}
						</p>

						<h2 className="mt-1 text-sm sm:text-base font-semibold text-gray-900 line-clamp-2">
							{chapter.name_simple}
						</h2>

						<p className="mt-1 text-xs text-gray-600 line-clamp-1">
							{chapter.name_arabic}
						</p>

						<div className="mt-2 flex flex-col gap-0.5 text-xs text-gray-500">
							<span className="capitalize">{chapter.revelation_place}</span>
							<span>{chapter.verses_count} verses</span>
						</div>
						</div>
					</article>
				</Link>
				))}
			</div>
		</section>
	)
}

export default ReadQuran
