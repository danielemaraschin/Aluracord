import { Children } from "react/cjs/react.production.min";//fez import automatico

function GlobalStyle(){
    return(
        <style global jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          list-style: none;
        }
        body {
          font-family: 'Open Sans', sans-serif;
        }
        /* App fit Height */ 
        html, body, #__next {
          min-height: 100vh;
          display: flex;
          flex: 1;
        }
        #__next {
          flex: 1;
        }
        #__next > * {
          flex: 1;
        }
        /* ./App fit Height */ 
      `}</style>
      //app fit height é para ajustar automatico cabeçalho
    );
  }
function Titulo(props) {
    console.log(props)
    const Tag = props.tag
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
            ${Tag} 
                {
                    color: pink;
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
            <GlobalStyle></GlobalStyle>
            <Titulo tag="h2">está sendo ignorado</Titulo>
            <h2>Discord - Alura Matrix</h2>
        </div>
    )
}

export default HomePage