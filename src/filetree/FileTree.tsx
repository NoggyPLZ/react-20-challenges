import Layout from "../components/Layout/Layout";
import { useState } from "react";

type FileNodeData = {
    name: string;
    children?: FileNodeData[]
}

type FileNodeProps = {
    node: FileNodeData;
}

export default function FileTree(){
    const fileStructure = [
        {
            name:'folder1',
            children:[
                {name:'folder1-1', children:[{name:'file1-1-1.txt'}, {name:'file1-1-2.txt'}]},
                {name:'file1-2.text'}
            ]
        },
        {name:'folder2', children:[{name:'folder2-1',children:[{name:'file2-1-1'}]}]}
    ];

    return(
        <Layout>
            <div className="flex flex-col gap-2">
                {fileStructure.map((node) =>(
                    <FileNode node={node} key={node.name} />
                ))}
            </div>
        </Layout>
    )
}

function FileNode({node}: FileNodeProps){
    const[open, setOpen] = useState(false);

    const clickHandler = () =>{
        setOpen(prev => !prev);
    }

    return(
        <div className="pl-10 text-2xl font-bold">
            {node.children ? 
            <button 
            className="text-blue-500 hover:text-blue-400 cusor-pointer"
            onClick={clickHandler}>
                📁 {node.name}{open ? '-' : '+'}
            </button> 
            : 
            <>📄 {node.name}</>
            }
            <>
            {open && node.children?.map((child) => (
                <FileNode key={child.name} node={child} />
            ))}
            </>
        </div>
    )
}