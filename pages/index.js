import { Children } from "react/cjs/react.production.min";//fez import automatico

function Titulo(props){
    return (
        <>
            <h1>{props.children}</h1>
        </>
    )

    ;
}

//component react
function HomePage() {
    return (
        <div>
            <Titulo>está sendo ignorado</Titulo>
            <h2>Discord - Alura Matrix</h2>
            <style jsx>{`
                h1{
                    color: red;
                }
            `}</style>
        </div>
    )
  }
  
  export default HomePage