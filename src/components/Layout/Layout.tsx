import BackButton from "../../utility/BackButton"

export default function Layout({children}: {children: React.ReactNode}){
    return(
        <main className="bg-gray-900 h-dvh text-gray-100 p-10 flex flex-col gap-8">
            <div className="flex flex-row">
                <BackButton />
            </div>
            {children}
        </main>
    )
}