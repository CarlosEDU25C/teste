import {
    cadastrarCachorro,
    carregarCachorros,
    exibirCachorros
} from "./cachorro.js";


import {
    criarAgendamento,
    listarAgendamentos,
    cancelarAgendamento
} from "./agendamento.js";


import {
    mostrarMensagem,
    obterDiaSemana,
    dataEhPassada
} from "./util.js";


const formCachorro =
    document.getElementById(
        "formCachorro"
    );


const formAgendamento =
    document.getElementById(
        "formAgendamento"
    );


const selectCachorro =
    document.getElementById(
        "cachorro"
    );


const listaCachorros =
    document.getElementById(
        "listaCachorros"
    );


const listaAgendamentos =
    document.getElementById(
        "listaAgendamentos"
    );


const mensagemCachorro =
    document.getElementById(
        "mensagemCachorro"
    );


const mensagemAgendamento =
    document.getElementById(
        "mensagemAgendamento"
    );


const dataInput =
    document.getElementById(
        "data"
    );


const diaSemana =
    document.getElementById(
        "diaSemana"
    );


const fundoModal =
    document.getElementById(
        "fundoModal"
    );


const fecharModal =
    document.getElementById(
        "fecharModal"
    );


const informacoesCachorro =
    document.getElementById(
        "informacoesCachorro"
    );


/*
    ATUALIZA TODA A INTERFACE
*/

function atualizarTela() {

    carregarCachorros(
        selectCachorro
    );


    exibirCachorros(

        listaCachorros,

        abrirInformacoesCachorro

    );


    listarAgendamentos(
        listaAgendamentos
    );
}


/*
    CADASTRO DO CACHORRO
*/

formCachorro.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const dados = {

            nome:
                document.getElementById(
                    "nome"
                ).value.trim(),

            idade:
                document.getElementById(
                    "idade"
                ).value,

            peso:
                document.getElementById(
                    "peso"
                ).value,

            raca:
                document.getElementById(
                    "raca"
                ).value.trim(),

            tamanho:
                document.getElementById(
                    "tamanho"
                ).value,

            vacinas:
                document.getElementById(
                    "vacinas"
                ).value.trim(),

            doencas:
                document.getElementById(
                    "doencas"
                ).value.trim()

        };


        try {

            cadastrarCachorro(
                dados
            );


            mostrarMensagem(

                mensagemCachorro,

                "Cachorro cadastrado e salvo com sucesso.",

                true

            );


            formCachorro.reset();


            atualizarTela();


        } catch (erro) {

            mostrarMensagem(

                mensagemCachorro,

                erro.message,

                false

            );

        }

    }
);


/*
    DATA
*/

dataInput.addEventListener(
    "change",
    () => {

        const data =
            dataInput.value;


        if (!data) {

            diaSemana.textContent =
                "";

            return;
        }


        const dia =
            obterDiaSemana(
                data
            );


        diaSemana.textContent =
            dia;


        if (
            dia ===
            "Domingo"
        ) {

            diaSemana.textContent +=
                " - Não há atendimento neste dia.";

        }

    }
);


/*
    AGENDAMENTO
*/

formAgendamento.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const dados = {

            cachorroId:
                selectCachorro.value,

            data:
                dataInput.value,

            horario:
                document.getElementById(
                    "horario"
                ).value,

            servico:
                document.getElementById(
                    "servico"
                ).value

        };


        if (!dados.cachorroId) {

            mostrarMensagem(

                mensagemAgendamento,

                "Selecione um cachorro.",

                false

            );

            return;
        }


        if (!dados.data) {

            mostrarMensagem(

                mensagemAgendamento,

                "Selecione uma data.",

                false

            );

            return;
        }


        if (
            dataEhPassada(
                dados.data
            )
        ) {

            mostrarMensagem(

                mensagemAgendamento,

                "Não é possível agendar uma data passada.",

                false

            );

            return;
        }


        try {

            criarAgendamento(
                dados
            );


            mostrarMensagem(

                mensagemAgendamento,

                "Agendamento salvo com sucesso.",

                true

            );


            formAgendamento.reset();


            diaSemana.textContent =
                "";


            atualizarTela();


        } catch (erro) {

            mostrarMensagem(

                mensagemAgendamento,

                erro.message,

                false

            );

        }

    }
);


/*
    CANCELAMENTO
*/

listaAgendamentos.addEventListener(
    "click",
    event => {

        if (
            !event.target.classList.contains(
                "botao-cancelar"
            )
        ) {

            return;
        }


        const id =
            event.target.dataset.id;


        const confirmar =
            window.confirm(
                "Deseja realmente cancelar este agendamento?"
            );


        if (!confirmar) {

            return;
        }


        cancelarAgendamento(
            id
        );


        atualizarTela();

    }
);


/*
    ABRIR INFORMAÇÕES DO CACHORRO
*/

function abrirInformacoesCachorro(
    cachorro
) {

    informacoesCachorro.innerHTML = `

        <h2 class="titulo-cachorro">

            ${cachorro.nome}

        </h2>


        <div class="informacao">

            <strong>Idade</strong>

            ${cachorro.idade} ano(s)

        </div>


        <div class="informacao">

            <strong>Peso</strong>

            ${cachorro.peso} kg

        </div>


        <div class="informacao">

            <strong>Raça</strong>

            ${cachorro.raca}

        </div>


        <div class="informacao">

            <strong>Tamanho</strong>

            ${cachorro.tamanho}

        </div>


        <div class="informacao">

            <strong>Vacinas</strong>

            ${
                cachorro.vacinas
                || "Não informado"
            }

        </div>


        <div class="informacao">

            <strong>Doenças anteriores</strong>

            ${
                cachorro.doencas
                || "Nenhuma informada"
            }

        </div>

    `;


    fundoModal.classList.add(
        "aberto"
    );
}


/*
    FECHAR INFORMAÇÕES
*/

fecharModal.addEventListener(
    "click",
    () => {

        fundoModal.classList.remove(
            "aberto"
        );

    }
);


/*
    FECHAR CLICANDO FORA
*/

fundoModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            fundoModal
        ) {

            fundoModal.classList.remove(
                "aberto"
            );

        }

    }
);


/*
    INICIALIZAÇÃO
*/

document.addEventListener(
    "DOMContentLoaded",
    () => {

        atualizarTela();

    }
);