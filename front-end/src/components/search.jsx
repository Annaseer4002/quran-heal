export function Search(props){


    function search(formData){
        const query = formData.get('query')
        
        console.log(query);
        
    }
    return (
        <section>
            <div className="text-center my-10">
              <h1 className="text-3xl font-bold text-blue-600">{props.searchName}</h1>
              <p className="text-black-500 mt-2">{props.searchDescription}</p>
            </div>
            
        <form method="get" action={search} className="flex items-center justify-center gap-2 mt-4 mb-5">
            <input name="query" type="search" placeholder="e.g depression" className="w-1/2 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <button className="w-auto bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md">Search</button>
         </form>
       </section>
         
    )
}