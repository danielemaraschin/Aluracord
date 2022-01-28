import { Children } from "react/cjs/react.production.min";//fez import automatico

function Titulo(props){
    return (
        <>
            <h1>{props.children}</h1>
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
    return (
        <div>
            <Titulo>está sendo ignorado</Titulo>
            <h2>Discord - Alura Matrix</h2>

        </div>
    )
  }
  
  export default HomePage