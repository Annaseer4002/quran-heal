import { Header } from "../components/header"
import { Search } from "../components/search"
import { Cards } from "../components/card"
import { Footer } from "../components/footer"
import { Link } from "react-router-dom"

import cardData from "../pages/cards"




export function Home(){
    
    const fetchCards = cardData.map((card, index)=> {
        // Wrap the "Read the Quran" card (first card) with a Link to /read
        if (index === 0) {
            return (
                <Link key={card.id} to="/read" className="no-underline">
                    <Cards
                        cardImage={card.cardImage}
                        cardTitle={card.cardTitle}
                    />
                </Link>
            )
        }

        if (index === 1) {
            return (
                <Link key={card.id} to="/listen" className="no-underline">
                    <Cards
                        cardImage={card.cardImage}
                        cardTitle={card.cardTitle}
                    />

                </Link> 
                )}
                    
          
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
             <Search/>

              <main className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-4">
                {fetchCards}
              </main>
             <Footer />       
            
            
            </>
           </div>
    )
}