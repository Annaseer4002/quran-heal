export function Cards(props){
 return (
    
        <div className="mt-6 p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-transparent hover:border-gray-600 w-32 sm:w-40 md:w-48">

            <img 
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32"
              src={props.cardImage.src}
              alt="quran-card" 
            />

            <h2 className="mt-1 font-semibold text-sm sm:text-base dark:text-gray-900">{props.cardTitle}</h2>
        </div>

        
        
 )
} 