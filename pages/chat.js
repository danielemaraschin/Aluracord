import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js'
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzY2MDA3NiwiZXhwIjoxOTU5MjM2MDc2fQ._WPZ6wTRt9N44MvecppoHk0EiGRJAym2gm30LR87H54'
const SUPABASE_URL = 'https://icscbahdmnirzqegnofj.supabase.co'
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);



 //from(nome da tb q quer buscar as info)
 function escutaMensagensEmTempoReal(adicionaMensagem) {
    return supabaseClient
      .from('mensagens')
      .on('INSERT', (respostaLive) => {
        adicionaMensagem(respostaLive.new);
      })
      .subscribe();
  }
    

export default function ChatPage() {

    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username;
    console.log(roteamento.query);
    console.log('usuarioLogado: ', usuarioLogado)
    const [mensagem, setMensagem] = React.useState("")
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

    React.useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false }) //lib supabase tem essa sintaxe para ordenarmos os itens do objeto
            .then(({ data }) => {
                // console.log('Dados da Consulta: ', data);
                setListaDeMensagens(data) //data eh onde fica armazenada as msg quando abrimos o console 
            });
            
            escutaMensagensEmTempoReal((novaMensagem) => { //qnd escutar uma nova mensagem, chama a funcao do setdemensagens
//se quero REusar um valor de referencia (objeto/array)devo passar uma funcao pro setState
            console.log('Nova mensagem? ', novaMensagem);
            setListaDeMensagens((valorAtualDaLista) => {
                return [
                    novaMensagem,
                    ...valorAtualDaLista,
                ]
            });
            //NAO FAZ COMO ABAIXO PQ SO VAI PEGAR O VALOR INICIAL DO ARRAY
            // setListaDeMensagens([
            //     novaMensagem,
            //     ...listaDeMensagens, //td q tinha na lista com a nova msg
            // ]);
        })
    }, []);//deixar array vazio pq so quero que o useEffect seja chamado ao recarregar a page

    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            //id: listaDeMensagens.length + 1,    //posso usar o id que vem do servidor entao nao precisa mais desse
            de: usuarioLogado,
            texto: novaMensagem,
        };

        supabaseClient
            .from('mensagens')
            .insert([
                //tem q ser um objeto com os MESMOS CAMPOS q vc escreveu no supabase
                mensagem
            ])
            .then(({ data }) => {
                console.log('Criando mensagem: ', data)
            });
        setMensagem('')
    }



    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary['000'],
                backgroundImage: `url(https://lalarebelo.com/wp-content/uploads/2016/12/dicas-polinesia-francesa-tahiti_0281.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    <MessageList mensagens={listaDeMensagens} />
                    {/* { listaDeMensagens.map((mensagemAtual)=> {
                         return (
                             <li key={mensagemAtual.id}>
                                 {mensagemAtual.de} : {mensagemAtual}
                             </li>
                         )
                     })} */}

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setMensagem(valor)
                            }}

                            onKeyPress={(event) => {
                                if (event.key === "Enter") {
                                    event.preventDefault(); //enter default eh pular a linha, dai nao vai pular a linha
                                    handleNovaMensagem(mensagem);
                                }
                            }}

                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        {/*callback*/}
                        <ButtonSendSticker
                            onStickerClick={(sticker) => {
                                console.log('usando o componente - salva esse sticke no db');
                                handleNovaMensagem(':sticker: ' + sticker);
                            }} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    console.log('MessageList', props);
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />
                            <Text tag="strong">
                                {mensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {/*condicional declarativa */}
                        {mensagem.texto.startsWith(':sticker:') ?
                            (
                                <Image src={mensagem.texto.replace(':sticker:', '')} />
                            )
                            :
                            (mensagem.texto)}

                    </Text>

                );

            })}

        </Box>
    )
}
