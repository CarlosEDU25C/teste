export function gerarId() {

    return (
        Date.now().toString()
        +
        Math.random()
            .toString(36)
            .substring(2)
    );
}


export function mostrarMensagem(
    elemento,
    texto,
    sucesso
) {

    elemento.textContent =
        texto;


    elemento.className =
        sucesso
            ? "mensagem sucesso"
            : "mensagem erro";
}


export function formatarData(
    data
) {

    const partes =
        data.split("-");


    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}


export function obterDiaSemana(
    data
) {

    const dataObj =
        new Date(
            data +
            "T00:00:00"
        );


    const dias = [

        "Domingo",
        "Segunda-feira",
        "Terça-feira",
        "Quarta-feira",
        "Quinta-feira",
        "Sexta-feira",
        "Sábado"

    ];


    return dias[
        dataObj.getDay()
    ];
}


export function dataEhPassada(
    data
) {

    const hoje =
        new Date();


    hoje.setHours(
        0,
        0,
        0,
        0
    );


    const selecionada =
        new Date(
            data +
            "T00:00:00"
        );


    return selecionada < hoje;
}