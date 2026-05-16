export function Cards(props){
 return (
    
        <div className="mt-6 p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-transparent hover:border-gray-600 w-48">

            <img 
              className="w-32 h-32"
              src={props.cardImage.src}
              alt="quran-card" 
            />

            <h2 className="mt-1 font-semibold dark:text-gray-900">{props.cardTitle}</h2>
        </div>

        
        
 )
} 