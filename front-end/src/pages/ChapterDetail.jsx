import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Header } from "../components/header"
import { Footer } from "../components/footer"
import apiUrl from "../utils/api"

// Helper function to strip HTML tags
function stripHtmlTags(html) {
	if (!html) return ""
	return html.replace(/<[^>]*>/g, "")
}

export function ChapterDetail() {
	const { chapterId } = useParams()
	const [chapter, setChapter] = useState(null)
	const [verses, setVerses] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState("")

	useEffect(() => {
		const controller = new AbortController()

		async function loadChapterDetails() {
			try {
				setLoading(true)
				setError("")

				// Fetch chapter metadata
				const chapterRes = await fetch(apiUrl(`/api/chapter/${chapterId}`), {
					signal: controller.signal,
				})

				if (!chapterRes.ok) {
					throw new Error("Failed to fetch chapter details")
				}

				const chapterData = await chapterRes.json()
				const chapterInfo = Array.isArray(chapterData)
					? chapterData[0]
					: chapterData?.chapter || chapterData

				setChapter(chapterInfo)

				// Fetch verses (Arabic text)
				const versesRes = await fetch(apiUrl(`/api/uthmani-tajweed/${chapterId}`), {
					signal: controller.signal,
				})

				if (!versesRes.ok) {
					throw new Error("Failed to fetch verses")
				}

				const versesData = await versesRes.json()
				const versesList = Array.isArray(versesData)
					? versesData
					: Array.isArray(versesData?.verses)
						? versesData.verses
						: []

				// Fetch translations (English)
				const translationsRes = await fetch(apiUrl(`/api/translations/${chapterId}`), {
					signal: controller.signal,
				})

				let translationsMap = {}
				if (translationsRes.ok) {
					const translationsData = await translationsRes.json()
					const translationsList = Array.isArray(translationsData)
						? translationsData
						: Array.isArray(translationsData?.translations)
							? translationsData.translations
							: []

					// Map translations by index (they're ordered by verse)
					translationsList.forEach((trans, index) => {
						translationsMap[index] = trans.text
					})
				}

				// Merge verses with translations (match by index)
				const mergedVerses = versesList.map((verse, index) => ({
					...verse,
					translation: translationsMap[index] || null,
				}))

				setVerses(mergedVerses)
			} catch (fetchError) {
				if (fetchError.name !== "AbortError") {
					setError(fetchError.message || "Something went wrong")
				}
			} finally {
				setLoading(false)
			}
		}

		loadChapterDetails()

		return () => controller.abort()
	}, [chapterId])

	if (loading) {
		return (
			<>
				<Header />
				<main className="min-h-screen bg-gray-50">
					<p className="text-center text-sm text-gray-500 py-12">Loading chapter...</p>
				</main>
				<Footer />
			</>
		)
	}

	if (error) {
		return (
			<>
				<Header />
				<main className="min-h-screen bg-gray-50">
					<p className="text-center text-sm text-red-600 py-12">{error}</p>
				</main>
				<Footer />
			</>
		)
	}

	return (
		<>
			<Header />
			<main className="min-h-screen bg-gray-50">
				{chapter && (
					<div className="mx-auto px-4 py-8">
						{/* Chapter Header */}
						<div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 mb-8">
							<div className="flex items-center justify-between mb-4">
								<div>
									<p className="text-sm text-gray-500 uppercase">Surah {chapter.id}</p>
									<h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
										{chapter.name_simple}
									</h1>
									<p className="text-2xl sm:text-3xl text-gray-600 mt-3">
										{chapter.name_arabic}
									</p>
								</div>
							</div>

							<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-sm">
								<div className="bg-blue-50 p-3 rounded">
									<p className="text-gray-600">Verses</p>
									<p className="text-2xl font-bold text-blue-600">{chapter.verses_count}</p>
								</div>
								<div className="bg-green-50 p-3 rounded">
									<p className="text-gray-600">Place</p>
									<p className="text-xl font-bold text-green-600 capitalize">{chapter.revelation_place}</p>
								</div>
								<div className="bg-purple-50 p-3 rounded">
									<p className="text-gray-600">Revelation Order</p>
									<p className="text-2xl font-bold text-purple-600">{chapter.revelation_order}</p>
								</div>
								{chapter.translated_name && (
									<div className="bg-amber-50 p-3 rounded">
										<p className="text-gray-600">Translation</p>
										<p className="text-lg font-bold text-amber-600">{chapter.translated_name.name}</p>
									</div>
								)}
							</div>
						</div>

						{/* Bismillah */}
						<div className="max-w-3xl mx-auto mb-8">
							<div className="bg-linear-to-r from-blue-50 to-blue-100 rounded-lg shadow-md p-8 border-t-4 border-blue-600">
								<p className="text-center text-2xl sm:text-4xl text-blue-800 leading-relaxed font-arabic mb-2 [direction:rtl]">
									بسم الله الرحمن الرحيم
								</p>
								<p className="text-center text-sm text-blue-600">
									In the Name of Allah, the Most Gracious, the Most Merciful
								</p>
							</div>
						</div>

						{/* Verses */}
						<div className="max-w-3xl mx-auto">
							{verses.length > 0 ? (
								<div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
									{/* Arabic Text - Continuous Flow */}
									<div className="mb-6 text-right">
										<p className="text-lg sm:text-2xl text-gray-800 leading-relaxed font-arabic text-right [direction:rtl] wrap-break-word">
										{verses.map((verse) => {
											const verseNum = verse.verse_key?.split(":")[1] || verse.id
											return (
												<span key={verse.id}>
													{verse.text_uthmani || ""}
													<span className="inline-flex items-center justify-center bg-blue-600 text-white rounded-full w-6 h-6 text-xs font-bold mx-1 align-middle">
														{verseNum}
													</span>
												</span>
											)
										})}
										</p>
									</div>

									{/* Translations */}
									<div className="space-y-4">
										{verses.map((verse) => {
											const verseNumber = verse.verse_key?.split(":")[1] || verse.id
											return (
												<div key={verse.id} className="border-b pb-3 last:border-b-0">
													<p className="text-xs font-semibold text-blue-600 mb-2">Verse {verseNumber}</p>
													{verse.translation && (
														<p className="text-gray-700 leading-relaxed">
															{stripHtmlTags(verse.translation)}
														</p>
													)}
												</div>
											)
										})}
									</div>
								</div>
							) : (
								<p className="text-center text-gray-500 py-8">No verses found</p>
							)}
						</div>
					</div>
				)}
			</main>
			<Footer />
		</>
	)
}

export default ChapterDetail
