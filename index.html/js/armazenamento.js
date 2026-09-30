const CHAVE_CACHORROS =
    "agendamento_pet_cachorros";

const CHAVE_AGENDAMENTOS =
    "agendamento_pet_agendamentos";


export function obterCachorros() {

    try {

        const dados =
            localStorage.getItem(
                CHAVE_CACHORROS
            );

        if (!dados) {

            return [];
        }

        const cachorros =
            JSON.parse(dados);

        return Array.isArray(cachorros)
            ? cachorros
            : [];

    } catch (erro) {

        console.error(
            "Erro ao carregar cachorros:",
            erro
        );

        return [];
    }
}


export function salvarCachorros(
    cachorros
) {

    try {

        localStorage.setItem(

            CHAVE_CACHORROS,

            JSON.stringify(
                cachorros
            )

        );

        /* Verifica se realmente foi salvo */

        const teste =
            localStorage.getItem(
                CHAVE_CACHORROS
            );

        if (!teste) {

            throw new Error(
                "O navegador não permitiu salvar os dados."
            );
        }

        return true;

    } catch (erro) {

        console.error(
            "Erro ao salvar cachorros:",
            erro
        );

        alert(
            "Não foi possível salvar os dados no navegador."
        );

        return false;
    }
}


export function obterAgendamentos() {

    try {

        const dados =
            localStorage.getItem(
                CHAVE_AGENDAMENTOS
            );

        if (!dados) {

            return [];
        }

        const agendamentos =
            JSON.parse(dados);

        return Array.isArray(
            agendamentos
        )
            ? agendamentos
            : [];

    } catch (erro) {

        console.error(
            "Erro ao carregar agendamentos:",
            erro
        );

        return [];
    }
}


export function salvarAgendamentos(
    agendamentos
) {

    try {

        localStorage.setItem(

            CHAVE_AGENDAMENTOS,

            JSON.stringify(
                agendamentos
            )

        );

        return true;

    } catch (erro) {

        console.error(
            "Erro ao salvar agendamentos:",
            erro
        );

        alert(
            "Não foi possível salvar o agendamento."
        );

        return false;
    }
}