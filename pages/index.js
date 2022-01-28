function Titulo(){
    return(
        <h1>Boas vindas de volta</h1>
    );
}

//component react
function HomePage() {
    return (
        <div>
            <Titulo>testando 123</Titulo>
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