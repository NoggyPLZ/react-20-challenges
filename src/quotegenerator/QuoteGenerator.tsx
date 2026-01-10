import { useQuery } from "@tanstack/react-query";
import Layout from "../components/Layout/Layout";

type Quote = {
    sentence: string;
    character: {
        name: string;
        house: {
            name: string;
        }
    }
}

export default function QuoteGenerator(){
    const {data: quoteRan, isPlaceholderData, isFetching, isLoading, error, refetch} = useQuery<Quote>({
        queryKey: ['quotes'], 
        queryFn: async (): Promise<Quote> =>{
            const response = await fetch('https://api.gameofthronesquotes.xyz/v1/random');
            if(!response.ok) throw new Error(`${response.status}`)
            const data = await response.json();
            return data;
        }, 
        enabled: false,
        placeholderData: (oldData) => oldData,
    });

    return (
        <Layout>
            <div className="flex flex-row justify-center">
            <div className="flex flex-col items-center border-2 gap-8 border-gray-100 text-gray-100 justify-center p-10 rounded-2xl w-6/12">
                <p className="w-8/12 italic text-3xl text-center min-h-40 flex flex-col justify-center">
                {(isLoading && !isPlaceholderData) && <p>Loading...</p>}
                {error && <p>Error: {(error as Error).message}</p>}
                {!isLoading && !isFetching && !error && (
                    <>
                    {quoteRan ? 
                        <>
                        <p className="font-bold">{`${quoteRan.sentence}`}</p>
                        <p className="text-lg">{`-${quoteRan.character.name} of ${quoteRan.character.house.name}`}</p>
                        </>
                        : 
                        'Click to get a quote'}
                    </>
                )}
                </p>
                
                <button onClick={() => refetch()} className="bg-gray-100 pl-10 pr-10 p-5 text-gray-900 hover:bg-gray-400 rounded-2xl cursor-pointer font-bold w-6/12">Get New Quote</button>
            </div>
            </div>
       </Layout>
    )
}