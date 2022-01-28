import { Children } from "react/cjs/react.production.min";//fez import automatico

function Titulo(props){
    console.log(props)
    const Tag = props.tag
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
                h1{
                    color: red;
                    font-size: 24px;
                    font-weight: 600;
                }
            `}</style>
        </>
    )

    ;
}

//component react
function HomePage() {
    //JSX
    return (
        <div>
            <Titulo tag="h1">está sendo ignorado</Titulo>
            <h2>Discord - Alura Matrix</h2>
        </div>
    )
  }
  
  export default HomePage