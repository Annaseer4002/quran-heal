import { useMemo, useState } from "react"

const MOOD_RULES = [
    {
        key: "comfort",
        aliases: ["sad", "sadness", "lonely", "loneliness", "alone", "broken", "hurt", "grief", "grieving", "depressed", "depression", "down"],
    },
    {
        key: "fear",
        aliases: ["fear", "afraid", "scared", "worry", "worried", "anxiety", "anxious", "panic"],
    },
    {
        key: "stress",
        aliases: ["stress", "stressed", "burn out", "burnout", "overwhelmed", "exhausted", "tired", "pressure"],
    },
    {
        key: "hope",
        aliases: ["hope", "hopeful", "guidance", "comfort", "peace", "calm"],
    },
    {
        key: "mercy",
        aliases: ["despair", "hopeless", "hopelessness", "guilty", "regret", "shame", "sin", "sins"],
    },
    {
        key: "gratitude",
        aliases: ["happy", "happiness", "joy", "grateful", "gratitude", "thankful", "blessed"],
    },
    {
        key: "anger",
        aliases: ["angry", "anger", "rage", "furious", "irritated", "resentment"],
    },
    {
        key: "love",
        aliases: ["love", "loving", "beloved", "affection", "affectionate"],
    },
    {
        key: "envy",
        aliases: ["envy", "envious", "jealous", "jealousy"],
    },
    {
        key: "regret",
        aliases: ["regret", "remorse", "repent", "repentance", "sorry", "ashamed"],
    },
]

const FEATURED_AYAH_BY_MOOD = {
    comfort: {
        id: "2:153",
        mood: "comfort",
        chapterId: 2,
        title: "Patience and prayer",
        arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
        translation: "O you who have believed, seek help through patience and prayer. Indeed, Allah is with the patient.",
    },
    fear: {
        id: "13:28",
        mood: "fear",
        chapterId: 13,
        title: "Hearts find rest",
        arabic: "الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ اللَّهِ ۗ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
        translation: "Those who have believed and whose hearts are assured by the remembrance of Allah. Unquestionably, by the remembrance of Allah hearts find rest.",
    },
    stress: {
        id: "94:5-6",
        mood: "stress",
        chapterId: 94,
        title: "Ease after hardship",
        arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا",
        translation: "Indeed, with hardship comes ease. Indeed, with hardship comes ease.",
    },
    hope: {
        id: "93:3-5",
        mood: "hope",
        chapterId: 93,
        title: "Your Lord has not forsaken you",
        arabic: "مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ ۝ وَلَلْآخِرَةُ خَيْرٌ لَكَ مِنَ الْأُولَىٰ ۝ وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ",
        translation: "Your Lord has not forsaken you, nor has He detested you. And the Hereafter is better for you than the first life. And your Lord will give you, and you will be satisfied.",
    },
    mercy: {
        id: "39:53",
        mood: "mercy",
        chapterId: 39,
        title: "Do not despair",
        arabic: "قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ ۚ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا ۚ إِنَّهُ هُوَ الْغَفُورُ الرَّحِيمُ",
        translation: "Say, 'O My servants who have transgressed against themselves, do not despair of the mercy of Allah. Indeed, Allah forgives all sins.'",
    },
    gratitude: {
        id: "14:7",
        mood: "gratitude",
        chapterId: 14,
        title: "If you are grateful",
        arabic: "وَإِذْ تَأَذَّنَ رَبُّكُمْ لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ ۖ وَلَئِن كَفَرْتُمْ إِنَّ عَذَابِي لَشَدِيدٌ",
        translation: "And [remember] when your Lord proclaimed: If you are grateful, I will surely increase you [in favor]; but if you deny, indeed, My punishment is severe.",
    },
    anger: {
        id: "41:34",
        mood: "anger",
        chapterId: 41,
        title: "Respond with what is best",
        arabic: "وَلَا تَسْتَوِي الْحَسَنَةُ وَلَا السَّيِّئَةُ ۚ ادْفَعْ بِالَّتِي هِيَ أَحْسَنُ",
        translation: "The good deed and the bad deed are not equal. Repel [evil] by that [deed] which is better.",
    },
    love: {
        id: "3:31",
        mood: "love",
        chapterId: 3,
        title: "If you love Allah",
        arabic: "قُلْ إِن كُنتُمْ تُحِبُّونَ اللَّهَ فَاتَّبِعُونِي يُحْبِبْكُمُ اللَّهُ",
        translation: "Say, [O Muhammad], 'If you should love Allah, then follow me; Allah will love you.'",
    },
    envy: {
        id: "4:54",
        mood: "envy",
        chapterId: 4,
        title: "Do you envy what Allah has given",
        arabic: "أَمْ يَحْسُدُونَ النَّاسَ عَلَى مَا آتَاهُمُ اللَّهُ مِن فَضْلِهِ",
        translation: "Or do they envy people for what Allah has given them of His bounty?",
    },
    regret: {
        id: "66:8",
        mood: "regret",
        chapterId: 66,
        title: "Turn to Allah in sincere repentance",
        arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا تُوبُوا إِلَى اللَّهِ تَوْبَةً نَّصُوحًا",
        translation: "O you who have believed, repent to Allah with sincere repentance.",
    },
}

function normalizeText(value) {
    return value.toLowerCase().replace(/[^a-z\s]/g, " ").replace(/\s+/g, " ").trim()
}

function findMoodKeys(query) {
    const normalized = normalizeText(query)
    if (!normalized) {
        return ["comfort"]
    }

    const matches = MOOD_RULES.filter((rule) =>
        rule.aliases.some((alias) => normalized.includes(alias)),
    ).map((rule) => rule.key)

    return matches.slice(0, 1)
}

function getResultsForQuery(query) {
    const moodKeys = findMoodKeys(query)
    const results = moodKeys.map((moodKey) => FEATURED_AYAH_BY_MOOD[moodKey]).filter(Boolean)

    return {
        moodKeys,
        results,
    }
}

export function Search({
    searchName = "How is your heart today?",
    searchDescription = "Search by feeling, emotion, or mood to find an ayah that speaks to you.",
}) {
    const [query, setQuery] = useState("")
    const [submittedQuery, setSubmittedQuery] = useState("")

    const { moodKeys, results } = useMemo(() => getResultsForQuery(submittedQuery), [submittedQuery])

function getChapterAudioUrl(chapterId) {
	return `https://download.quranicaudio.com/qdc/mishari_al_afasy/murattal/${chapterId}.mp3`
}

    function handleSubmit(event) {
        event.preventDefault()
        setSubmittedQuery(query)
    }

    return (
        <section className="px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl text-center">
                <h1 className="text-3xl font-bold text-blue-600 sm:text-4xl">{searchName}</h1>
                <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-600 sm:text-base">{searchDescription}</p>

                <form onSubmit={handleSubmit} className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
                    <input
                        name="query"
                        type="search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="I am feeling sad, lonely, stressed..."
                        className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 sm:w-2/3"
                    />
                    <button className="rounded-md bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700">
                        Search
                    </button>
                </form>

                <p className="mt-3 text-xs text-gray-500">
                    Try: <span className="font-medium">i am feeling sad</span>, <span className="font-medium">fear</span>, <span className="font-medium">burn out</span>, <span className="font-medium">happy</span>
                </p>

                <div className="mt-8 text-left">
                    {!submittedQuery ? (
                        <div className="flex justify-center">
                            <article className="w-full rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
                                <div className="flex items-start justify-between gap-3 border-b border-gray-100 pb-3">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-600">{FEATURED_AYAH_BY_MOOD.hope.title}</p>
                                        <h2 className="mt-1 text-sm font-medium text-gray-500">Surah {FEATURED_AYAH_BY_MOOD.hope.chapterId}</h2>
                                    </div>
                                </div>

                                <p className="mt-5 text-right text-lg sm:text-2xl leading-tight text-gray-900 [direction:rtl] whitespace-normal wrap-break-word">
                                    {FEATURED_AYAH_BY_MOOD.hope.arabic}
                                </p>
                                <p className="mt-4 text-sm leading-7 text-gray-700">{FEATURED_AYAH_BY_MOOD.hope.translation}</p>
                                <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4">
                                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-blue-700">Audio</p>
                                    <audio controls preload="none" className="w-full" src={getChapterAudioUrl(FEATURED_AYAH_BY_MOOD.hope.chapterId)}>
                                        Your browser does not support the audio element.
                                    </audio>
                                    <p className="mt-2 text-[11px] text-blue-700">Full chapter recitation for this ayah&apos;s surah.</p>
                                </div>
                                <p className="mt-4 text-xs text-gray-500">Reference: {FEATURED_AYAH_BY_MOOD.hope.id}</p>
                            </article>
                        </div>
                    ) : (
                        <div>
                            <div className="mb-4 rounded-lg border border-blue-100 bg-blue-50 p-4">
                                <p className="text-sm text-blue-800">
                                    Showing ayahs for: <span className="font-semibold">{submittedQuery}</span>
                                </p>
                                <p className="mt-1 text-xs text-blue-700">
                                    Matched mood: <span className="font-semibold">{moodKeys.join(", ")}</span>
                                </p>
                            </div>

                            {results.length === 0 ? (
                                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                                    No direct match found for this feeling yet. Try words like sad, fear, stress, hope, mercy, or happy.
                                </div>
                            ) : (
                            <div className="flex justify-center">
                                {results.map((ayah) => (
                                    <article key={ayah.id} className="w-full rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
                                        <div className="flex items-start justify-between gap-3 border-b border-gray-100 pb-3">
                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-600">{ayah.title}</p>
                                                <h2 className="mt-1 text-sm font-medium text-gray-500">Surah {ayah.chapterId}</h2>
                                            </div>
                                        </div>

                                        <p className="mt-5 text-right text-lg sm:text-2xl leading-tight text-gray-900 [direction:rtl] whitespace-normal wrap-break-word">
                                            {ayah.arabic}
                                        </p>
                                        <p className="mt-4 text-sm leading-7 text-gray-700">{ayah.translation}</p>
                                        <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4">
                                            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-blue-700">Audio</p>
                                            <audio controls preload="none" className="w-full" src={getChapterAudioUrl(ayah.chapterId)}>
                                                Your browser does not support the audio element.
                                            </audio>
                                            <p className="mt-2 text-[11px] text-blue-700">Full chapter recitation for this ayah&apos;s surah.</p>
                                        </div>
                                        <p className="mt-4 text-xs text-gray-500">Reference: {ayah.id}</p>
                                    </article>
                                ))}
                            </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}