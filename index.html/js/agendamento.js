import {
    obterAgendamentos,
    salvarAgendamentos,
    obterCachorros
} from "./armazenamento.js";

import {
    gerarId,
    formatarData
} from "./util.js";


export function criarAgendamento(
    dados
) {

    const agendamentos =
        obterAgendamentos();


    const ocupado =
        agendamentos.some(
            agendamento =>

                agendamento.data ===
                dados.data

                &&

                agendamento.horario ===
                dados.horario

                &&

                agendamento.status ===
                "Agendado"
        );


    if (ocupado) {

        throw new Error(
            "Este horário já está ocupado."
        );
    }


    const data =
        new Date(
            dados.data +
            "T00:00:00"
        );


    if (
        data.getDay() === 0
    ) {

        throw new Error(
            "Não há atendimento aos domingos."
        );
    }


    const novoAgendamento = {

        id:
            gerarId(),

        cachorroId:
            dados.cachorroId,

        data:
            dados.data,

        horario:
            dados.horario,

        servico:
            dados.servico,

        status:
            "Agendado"

    };


    agendamentos.push(
        novoAgendamento
    );


    const salvo =
        salvarAgendamentos(
            agendamentos
        );


    if (!salvo) {

        throw new Error(
            "Não foi possível salvar o agendamento."
        );
    }


    return novoAgendamento;
}


export function listarAgendamentos(
    elemento
) {

    const agendamentos =
        obterAgendamentos();


    const cachorros =
        obterCachorros();


    elemento.innerHTML = "";


    if (
        agendamentos.length === 0
    ) {

        elemento.innerHTML = `

            <tr>

                <td colspan="6">

                    Nenhum agendamento cadastrado.

                </td>

            </tr>

        `;

        return;
    }


    agendamentos.sort(
        (a, b) => {

            const dataA =
                new Date(
                    `${a.data}T${a.horario}`
                );


            const dataB =
                new Date(
                    `${b.data}T${b.horario}`
                );


            return dataA - dataB;

        }
    );


    agendamentos.forEach(
        agendamento => {

            const cachorro =
                cachorros.find(
                    item =>
                        item.id ===
                        agendamento.cachorroId
                );


            const linha =
                document.createElement(
                    "tr"
                );


            const nomeCachorro =
                cachorro
                    ? cachorro.nome
                    : "Cachorro não encontrado";


            linha.innerHTML = `

                <td>
                    ${nomeCachorro}
                </td>

                <td>
                    ${formatarData(
                        agendamento.data
                    )}
                </td>

                <td>
                    ${agendamento.horario}
                </td>

                <td>
                    ${agendamento.servico}
                </td>

                <td>
                    ${agendamento.status}
                </td>

                <td>

                    ${
                        agendamento.status ===
                        "Agendado"

                        ?

                        `
                        <button
                            class="botao-cancelar"
                            data-id="${agendamento.id}"
                        >
                            Cancelar
                        </button>
                        `

                        :

                        "-"
                    }

                </td>

            `;


            elemento.appendChild(
                linha
            );

        }
    );
}


export function cancelarAgendamento(
    id
) {

    const agendamentos =
        obterAgendamentos();


    const agendamento =
        agendamentos.find(
            item =>
                item.id === id
        );


    if (!agendamento) {

        throw new Error(
            "Agendamento não encontrado."
        );
    }


    agendamento.status =
        "Cancelado";


    salvarAgendamentos(
        agendamentos
    );
}