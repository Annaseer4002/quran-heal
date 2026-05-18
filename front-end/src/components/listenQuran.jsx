import { useEffect, useMemo, useState } from "react"

export function ListenQuran() {
	const [audioFiles, setAudioFiles] = useState([])
	const [chapters, setChapters] = useState([])
	const [selectedChapterId, setSelectedChapterId] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState("")

	useEffect(() => {
		const controller = new AbortController()

		async function loadAudio() {
			try {
				setLoading(true)
				setError("")

				const [recitationsResponse, chaptersResponse] = await Promise.all([
					fetch("/api/recitations", { signal: controller.signal }),
					fetch("/api/chapters", { signal: controller.signal }),
				])

				if (!recitationsResponse.ok) {
					throw new Error("Failed to fetch recitations")
				}

				if (!chaptersResponse.ok) {
					throw new Error("Failed to fetch chapters")
				}

				const recitationsData = await recitationsResponse.json()
				const chaptersData = await chaptersResponse.json()

				const recitations = Array.isArray(recitationsData?.audio_files)
					? recitationsData.audio_files
					: []

				const chapterList = Array.isArray(chaptersData)
					? chaptersData
					: Array.isArray(chaptersData?.chapters)
						? chaptersData.chapters
						: []

				const sortedRecitations = [...recitations].sort((a, b) => a.chapter_id - b.chapter_id)

				setAudioFiles(sortedRecitations)
				setChapters(chapterList)

				if (sortedRecitations.length > 0) {
					setSelectedChapterId(sortedRecitations[0].chapter_id)
				}
			} catch (requestError) {
				if (requestError.name !== "AbortError") {
					setError(requestError.message || "Could not load audio recitations")
				}
			} finally {
				setLoading(false)
			}
		}

		loadAudio()

		return () => controller.abort()
	}, [])

	const chapterMap = useMemo(() => {
		return new Map(chapters.map((chapter) => [chapter.id, chapter]))
	}, [chapters])

	const selectedAudio = useMemo(() => {
		if (!selectedChapterId) return null
		return audioFiles.find((audio) => audio.chapter_id === selectedChapterId) || null
	}, [audioFiles, selectedChapterId])

	if (loading) {
		return <p className="text-center text-sm text-gray-500">Loading recitations...</p>
	}

	if (error) {
		return <p className="text-center text-sm text-red-600">{error}</p>
	}

	if (audioFiles.length === 0) {
		return <p className="text-center text-sm text-gray-500">No recitations available.</p>
	}

	return (
		<section className="px-2 py-6 sm:px-4 sm:py-8">
			<div className="mx-auto w-full max-w-7xl">
				{selectedAudio && (
					<div className="mb-4 rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
						<p className="mb-2 text-sm font-semibold text-gray-800">
							Now Playing: Surah {selectedAudio.chapter_id}
							{chapterMap.get(selectedAudio.chapter_id)?.name_simple
								? ` - ${chapterMap.get(selectedAudio.chapter_id).name_simple}`
								: ""}
						</p>
						<audio key={selectedAudio.id} controls className="w-full" src={selectedAudio.audio_url}>
							Your browser does not support the audio element.
						</audio>
					</div>
				)}

				<div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
					{audioFiles.map((audio) => {
						const chapter = chapterMap.get(audio.chapter_id)
						const isActive = selectedChapterId === audio.chapter_id

						return (
							<button
								type="button"
								key={audio.id}
								onClick={() => setSelectedChapterId(audio.chapter_id)}
								className={`rounded-lg border p-2 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
									isActive ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"
								}`}
							>
								<p className="text-[10px] uppercase tracking-wide text-gray-500">Surah {audio.chapter_id}</p>
								<h3 className="mt-1 text-sm font-semibold text-gray-900 line-clamp-2">
									{chapter?.name_simple || `Chapter ${audio.chapter_id}`}
								</h3>
								<p className="mt-1 text-xs text-gray-500 line-clamp-1">{chapter?.name_arabic || ""}</p>
							</button>
						)
					})}
				</div>
			</div>
		</section>
	)
}

export default ListenQuran

