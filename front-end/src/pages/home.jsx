import { Header } from "../components/header"
import { Search } from "../components/search"
import { Cards } from "../components/card"
import { Footer } from "../components/footer"

import cardData from "../pages/cards"




export function Home(){
    
    const fetchCards = cardData.map((card)=> {
        return (
            <Cards
                key={card.id}
                cardImage={card.cardImage}
                cardTitle={card.cardTitle}
            />
        )
    })
    return (
        <div className="home">
            <>
             <Header />
             <Search
              searchName="How is your heart today?"
              searchDescription="Seek guidance and find calm in the words of Allah."
              />
              <main className="flex items-center justify-center gap-4">
                {fetchCards}
              </main>
             <Footer />       
            
            
            </>
           </div>
    )
}